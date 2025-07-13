import { NextRequest, NextResponse } from "next/server";
import { createBatchRequest, parseBatchResponse } from "@/lib/facebook";
import {
  FacebookEventsResponse,
  FacebookPhotosResponse,
  BatchResponse,
  BatchRequestItem,
} from "@/types/facebook";

export async function GET(request: NextRequest) {
  try {
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!pageId || !accessToken) {
      return NextResponse.json(
        { error: "Facebook API credentials not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const eventsLimit = searchParams.get("events_limit") || "10";
    const photosLimit = searchParams.get("photos_limit") || "10";
    const eventsAfter = searchParams.get("events_after");
    const photosAfter = searchParams.get("photos_after");

    // Define fields for events and photos
    const eventsFields = [
      "id",
      "name",
      "description",
      "start_time",
      "end_time",
      "updated_time",
      "timezone",
      "is_canceled",
      "is_online",
      "ticket_uri",
      "attending_count",
      "interested_count",
      "cover{id,source}",
      "place{id,name,location{city,country,latitude,longitude,street,zip}}",
    ].join(",");

    const photosFields = [
      "id",
      "created_time",
      "name",
      "alt_text",
      "images",
      "album{id,name}",
      "likes.summary(true)",
      "comments.summary(true)",
      "reactions.summary(true)",
    ].join(",");

    // Create batch request items
    const batchItems: BatchRequestItem[] = [
      {
        method: "GET",
        relative_url: `${pageId}/events?fields=${eventsFields}&limit=${eventsLimit}${
          eventsAfter ? `&after=${eventsAfter}` : ""
        }`,
      },
      {
        method: "GET",
        relative_url: `${pageId}/photos?type=uploaded&fields=${photosFields}&limit=${photosLimit}${
          photosAfter ? `&after=${photosAfter}` : ""
        }`,
      },
    ];

    // Create batch request URL
    const batchUrl = createBatchRequest(batchItems, accessToken, true);

    const response = await fetch(batchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Cache for 5 minutes
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Facebook Batch API error:", errorData);
      return NextResponse.json(
        {
          error: "Failed to fetch data from Facebook API",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const batchResponse: BatchResponse[] = await response.json();
    const parsedResults = parseBatchResponse(batchResponse);

    const eventsData: FacebookEventsResponse = parsedResults[0];
    const photosData: FacebookPhotosResponse = parsedResults[1];

    // Combine results
    const responseData = {
      events: {
        ...eventsData,
        metadata: {
          total_count: eventsData?.data?.length || 0,
          has_next_page: !!eventsData?.paging?.next,
          has_previous_page: !!eventsData?.paging?.previous,
          api_version: "v23.0",
          cached_until: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        },
      },
      photos: {
        ...photosData,
        metadata: {
          total_count: photosData?.data?.length || 0,
          has_next_page: !!photosData?.paging?.next,
          has_previous_page: !!photosData?.paging?.previous,
          api_version: "v23.0",
          photo_type: "uploaded",
          cached_until: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        },
      },
      batch_info: {
        requests_made: 2,
        successful_requests: parsedResults.filter((r) => r !== null).length,
        failed_requests: parsedResults.filter((r) => r === null).length,
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Facebook-API-Version": "v23.0",
        "X-Batch-Request": "true",
        "X-Cache-Duration": "300",
      },
    });
  } catch (error) {
    console.error("Error in Facebook batch request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

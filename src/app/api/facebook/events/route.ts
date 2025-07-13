import { NextRequest, NextResponse } from "next/server";
import { FacebookEventsResponse } from "@/types/facebook";

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
    const limit = searchParams.get("limit") || "25";
    const after = searchParams.get("after");
    const before = searchParams.get("before");

    // Use Graph API v23.0 with enhanced fields and field expansion
    const fields = [
      "id",
      "name",
      "description",
      "start_time",
      "end_time",
      "updated_time",
      "timezone",
      "event_times",
      "is_canceled",
      "is_online",
      "is_page_owned",
      "ticket_uri",
      "attending_count",
      "declined_count",
      "interested_count",
      "maybe_count",
      "noreply_count",
      "cover{id,source,offset_x,offset_y}",
      "place{id,name,location{city,country,latitude,longitude,street,zip,state}}",
      "owner{id,name,category}",
    ].join(",");

    let url = `https://graph.facebook.com/v23.0/${pageId}/events?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    if (after) url += `&after=${after}`;
    if (before) url += `&before=${before}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 5 minutes to avoid hitting Facebook API rate limits
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Facebook API error:", errorData);

      // Handle specific Facebook error codes
      const fbError = errorData.error;
      if (fbError) {
        return NextResponse.json(
          {
            error: "Facebook API Error",
            code: fbError.code,
            type: fbError.type,
            message: fbError.message,
            subcode: fbError.error_subcode,
            details: fbError,
          },
          { status: fbError.code === 190 ? 401 : response.status }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to fetch events from Facebook API",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data: FacebookEventsResponse = await response.json();

    // Add metadata about the response
    const responseData = {
      ...data,
      metadata: {
        total_count: data.data?.length || 0,
        has_next_page: !!data.paging?.next,
        has_previous_page: !!data.paging?.previous,
        api_version: "v23.0",
        cached_until: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      },
    };

    // Add cache headers for client-side caching
    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Facebook-API-Version": "v23.0",
        "X-Cache-Duration": "300",
      },
    });
  } catch (error) {
    console.error("Error fetching Facebook events:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { FacebookAlbumsResponse } from "@/types/facebook";

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

    // Use Graph API v23.0 with enhanced fields for album data
    const fields = [
      "id",
      "name",
      "description",
      "type",
      "privacy",
      "count", // number of photos in album
      "created_time",
      "updated_time",
      "cover_photo{id,name,picture,source,images,created_time}",
      "from{id,name}",
      "place{name,location{city,country,latitude,longitude}}",
      "can_upload",
      "link",
    ].join(",");

    // Build pagination parameters
    const params = new URLSearchParams({
      access_token: accessToken,
      fields,
      limit,
    });

    if (after) {
      params.append("after", after);
    }
    if (before) {
      params.append("before", before);
    }

    const url = `https://graph.facebook.com/v23.0/${pageId}/albums?${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Facebook Graph API Client",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Facebook API Error:", errorData);

      // Handle specific Facebook error codes
      if (errorData?.error?.code === 190) {
        return NextResponse.json(
          { error: "Invalid or expired Facebook access token" },
          { status: 401 }
        );
      }

      if (errorData?.error?.code === 613) {
        return NextResponse.json(
          { error: "Facebook API rate limit exceeded" },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to fetch albums",
          details: errorData?.error?.message || "Unknown error",
        },
        { status: response.status }
      );
    }

    const data: FacebookAlbumsResponse = await response.json();

    // Add metadata about the response
    const responseData = {
      ...data,
      metadata: {
        api_version: "v23.0",
        requested_fields: fields.split(","),
        total_count: data.data?.length || 0,
        has_next_page: !!data.paging?.next,
        has_previous_page: !!data.paging?.previous,
        request_timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600", // 5min cache, 1hr stale
      },
    });
  } catch (error) {
    console.error("Error fetching Facebook albums:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

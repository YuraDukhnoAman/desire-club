import { NextRequest, NextResponse } from "next/server";
import { FacebookPhotosResponse } from "@/types/facebook";

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
    const type = searchParams.get("type") || "uploaded"; // uploaded, tagged, or profile

    // Use Graph API v23.0 with enhanced fields and field expansion
    const fields = [
      "id",
      "created_time",
      "updated_time",
      "name",
      "alt_text",
      "height",
      "width",
      "backdated_time",
      "can_delete",
      "can_tag",
      "link",
      "place{id,name,location{city,country,latitude,longitude,street,zip,state}}",
      "images",
      "album{id,name,type,description,created_time,updated_time,count,cover_photo{id,source}}",
      "from{id,name,category}",
      "likes.summary(true)",
      "comments.summary(true)",
      "reactions.summary(true)",
      "tags.summary(true)",
    ].join(",");

    let url = `https://graph.facebook.com/v23.0/${pageId}/photos?type=${type}&fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    if (after) url += `&after=${after}`;
    if (before) url += `&before=${before}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 10 minutes since photos change less frequently than events
      next: { revalidate: 600 },
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
          error: "Failed to fetch photos from Facebook API",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data: FacebookPhotosResponse = await response.json();

    // Add metadata about the response
    const responseData = {
      ...data,
      metadata: {
        total_count: data.data?.length || 0,
        has_next_page: !!data.paging?.next,
        has_previous_page: !!data.paging?.previous,
        api_version: "v23.0",
        photo_type: type,
        cached_until: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      },
    };

    // Add cache headers for client-side caching
    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        "X-Facebook-API-Version": "v23.0",
        "X-Cache-Duration": "600",
      },
    });
  } catch (error) {
    console.error("Error fetching Facebook photos:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

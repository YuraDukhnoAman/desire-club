import { NextResponse } from "next/server";
import { FacebookPhotosResponse } from "@/types/facebook";

export async function GET() {
  try {
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!pageId || !accessToken) {
      return NextResponse.json(
        { error: "Facebook API credentials not configured" },
        { status: 500 }
      );
    }

    const url = `https://graph.facebook.com/${pageId}/photos?type=uploaded&fields=id,created_time,name,images,album&access_token=${accessToken}`;

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
      return NextResponse.json(
        {
          error: "Failed to fetch photos from Facebook API",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data: FacebookPhotosResponse = await response.json();

    // Add cache headers for client-side caching
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch (error) {
    console.error("Error fetching Facebook photos:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

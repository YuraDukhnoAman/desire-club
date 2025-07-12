import { NextResponse } from "next/server";
import { FacebookEventsResponse } from "@/types/facebook";

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

    const url = `https://graph.facebook.com/${pageId}/events?fields=id,name,start_time,end_time,description,place,cover&access_token=${accessToken}`;

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
      return NextResponse.json(
        {
          error: "Failed to fetch events from Facebook API",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data: FacebookEventsResponse = await response.json();

    // Add cache headers for client-side caching
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching Facebook events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

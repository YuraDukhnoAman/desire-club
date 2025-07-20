import { NextRequest, NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/googleAuth";

interface GoogleReview {
  name: string;
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUri?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime: string;
}

interface GoogleReviewsResponse {
  reviews?: GoogleReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

interface PlacesReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    languageCode: string;
    text: string;
  };
  authorAttribution: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime: string;
}

interface PlacesResponse {
  name: string;
  rating: number;
  userRatingCount: number;
  reviews: PlacesReview[];
  nextPageToken?: string;
}

export async function GET(request: NextRequest) {
  console.log("API route called: /api/google-reviews");

  try {
    // Get pagination parameters
    const { searchParams } = new URL(request.url);
    const pageToken = searchParams.get("pageToken");
    const maxResults = parseInt(searchParams.get("maxResults") || "20"); // Default 20 reviews

    // Check for Google Maps API key (for Places API)
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    // Check for Google Business Profile credentials
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    console.log("Environment check:", {
      hasMapsApiKey: !!googleMapsApiKey,
      hasPlaceId: !!placeId,
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasRefreshToken: !!refreshToken,
    });

    // Try Google Places API first (simpler and more reliable)
    if (googleMapsApiKey && placeId) {
      console.log("Using Google Places API...");

      // Build URL - Google Places API returns max 5 reviews by default
      const placesUrl = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${googleMapsApiKey}`;

      const placesResponse = await fetch(placesUrl);

      if (!placesResponse.ok) {
        throw new Error(`Places API error: ${placesResponse.statusText}`);
      }

      const placesData: PlacesResponse = await placesResponse.json();

      // Transform Places API data to match our format
      const transformedReviews =
        placesData.reviews?.map((review, index) => ({
          id: `places-${index}`,
          author: review.authorAttribution.displayName,
          rating: review.rating,
          comment: review.text.text,
          createdAt: review.publishTime,
          updatedAt: review.publishTime,
          relativeTime: review.relativePublishTimeDescription,
          profilePhoto: review.authorAttribution.photoUri,
          authorUrl: review.authorAttribution.uri,
        })) || [];

      return NextResponse.json({
        reviews: transformedReviews,
        averageRating: placesData.rating,
        totalReviewCount: placesData.userRatingCount,
        source: "Google Places API (New)",
        pagination: {
          hasMore: false, // Google Places API only returns 5 reviews max
          totalAvailable: placesData.userRatingCount,
          currentCount: placesData.reviews?.length || 0,
          note: "Google Places API returns up to 5 most recent reviews",
        },
      });
    }

    // Fallback to Google Business Profile API (if credentials available)
    if (clientId && clientSecret && refreshToken) {
      console.log("Using Google Business Profile API...");

      // Get access token
      const accessToken = await getGoogleAccessToken();

      // For now, return enhanced mock data since Business Profile API is complex
      console.log(
        "Using enhanced mock data due to Business Profile API complexity"
      );
      return NextResponse.json({
        reviews: [
          {
            id: "mock-1",
            author: "Sarah M.",
            rating: 5,
            comment:
              "Amazing atmosphere and great music! The staff was super friendly and the drinks were perfect. Will definitely come back!",
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
          },
          {
            id: "mock-2",
            author: "David K.",
            rating: 5,
            comment:
              "Best nightclub in Tel Aviv! The live music was incredible and the vibe was electric. Highly recommend!",
            createdAt: "2024-01-10T22:15:00Z",
            updatedAt: "2024-01-10T22:15:00Z",
          },
          {
            id: "mock-3",
            author: "Rachel L.",
            rating: 4,
            comment:
              "Great place for a night out. Good music selection and nice crowd. The only downside was it got quite crowded later in the evening.",
            createdAt: "2024-01-08T21:45:00Z",
            updatedAt: "2024-01-08T21:45:00Z",
          },
          {
            id: "mock-4",
            author: "Michael T.",
            rating: 5,
            comment:
              "Incredible experience! The DJ was amazing and the atmosphere was perfect. Can't wait to come back next weekend!",
            createdAt: "2024-01-05T23:20:00Z",
            updatedAt: "2024-01-05T23:20:00Z",
          },
          {
            id: "mock-5",
            author: "Anna B.",
            rating: 4,
            comment:
              "Really enjoyed the live band performance. The venue has great acoustics and the staff was very attentive.",
            createdAt: "2024-01-03T20:15:00Z",
            updatedAt: "2024-01-03T20:15:00Z",
          },
          {
            id: "mock-6",
            author: "Tom R.",
            rating: 5,
            comment:
              "Best night out in a long time! The cocktails were delicious and the music was exactly what I was looking for.",
            createdAt: "2024-01-01T22:45:00Z",
            updatedAt: "2024-01-01T22:45:00Z",
          },
          {
            id: "mock-7",
            author: "Lisa K.",
            rating: 4,
            comment:
              "Great venue with a fantastic atmosphere. The food was surprisingly good for a club. Will definitely return!",
            createdAt: "2023-12-28T21:30:00Z",
            updatedAt: "2023-12-28T21:30:00Z",
          },
          {
            id: "mock-8",
            author: "Daniel S.",
            rating: 5,
            comment:
              "Absolutely loved the karaoke night! The staff was so supportive and the crowd was amazing. Perfect evening!",
            createdAt: "2023-12-25T19:15:00Z",
            updatedAt: "2023-12-25T19:15:00Z",
          },
        ],
        averageRating: 4.6,
        totalReviewCount: 8,
        source: "Mock Data (Business Profile API fallback)",
      });
    }

    // Final fallback - basic mock data
    console.log("No credentials found, using basic mock data");
    return NextResponse.json({
      reviews: [
        {
          id: "mock-1",
          author: "Sarah M.",
          rating: 5,
          comment:
            "Amazing atmosphere and great music! The staff was super friendly and the drinks were perfect. Will definitely come back!",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "mock-2",
          author: "David K.",
          rating: 5,
          comment:
            "Best nightclub in Tel Aviv! The live music was incredible and the vibe was electric. Highly recommend!",
          createdAt: "2024-01-10T22:15:00Z",
          updatedAt: "2024-01-10T22:15:00Z",
        },
        {
          id: "mock-3",
          author: "Rachel L.",
          rating: 4,
          comment:
            "Great place for a night out. Good music selection and nice crowd. The only downside was it got quite crowded later in the evening.",
          createdAt: "2024-01-08T21:45:00Z",
          updatedAt: "2024-01-08T21:45:00Z",
        },
      ],
      averageRating: 4.7,
      totalReviewCount: 3,
      source: "Mock Data (no credentials)",
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { queries } from "@/lib/sanity";
import { SanityReview, transformSanityReview } from "@/types/sanity";

// ISR settings for this route
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const reviewType = searchParams.get("type") as 'guest' | 'corporate' | 'property-owner' | null;
    const limit = searchParams.get("limit");

    let query = queries.allReviews;
    const queryParams: any = {};
    
    // If featured filter is requested
    if (featured === "true") {
      query = queries.featuredReviews;
    }
    
    // If review type filter is requested
    if (reviewType && ['guest', 'corporate', 'property-owner'].includes(reviewType)) {
      query = queries.reviewsByType;
      queryParams.reviewType = reviewType;
    }

    // If limit is specified, add it to the query
    if (limit) {
      query = query.replace("] | order", `][0...${limit}] | order`);
    }

    const sanityReviews: SanityReview[] = await client.fetch(query, queryParams);

    const reviews = sanityReviews.map(transformSanityReview);

    return NextResponse.json({
      success: true,
      data: reviews,
      total: reviews.length
    });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
        data: []
      },
      { status: 500 }
    );
  }
}

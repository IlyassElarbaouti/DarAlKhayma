import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { queries } from "@/lib/sanity";
import { SanityReview, transformSanityReview } from "@/types/sanity";

// ISR settings for this route
export const dynamic = 'force-dynamic';
export const revalidate = 30; // Revalidate every 30 seconds

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    let query = queries.allReviews;
    
    // If featured filter is requested
    if (featured === "true") {
      query = queries.featuredReviews;
    }

    // If limit is specified, add it to the query
    if (limit) {
      query = query.replace("] | order", `][0...${limit}] | order`);
    }

    const sanityReviews: SanityReview[] = await client.fetch(query);

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

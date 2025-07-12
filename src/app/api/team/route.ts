import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { queries } from "@/lib/sanity";
import { SanityTeamMember, transformSanityTeamMember } from "@/types/sanity";

// ISR settings for this route
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let query = queries.allTeamMembers;
    
    // If featured filter is requested
    if (featured === "true") {
      query = queries.featuredTeamMembers;
    }

    const sanityTeamMembers: SanityTeamMember[] = await client.fetch(query);

    const teamMembers = sanityTeamMembers.map(transformSanityTeamMember);

    return NextResponse.json({
      success: true,
      data: teamMembers,
      total: teamMembers.length
    });

  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch team members",
        data: []
      },
      { status: 500 }
    );
  }
}

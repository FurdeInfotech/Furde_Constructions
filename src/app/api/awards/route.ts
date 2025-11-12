import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AwardModel from "@/models/Award";
import { getToken } from "next-auth/jwt";

// GET - Fetch all awards
export async function GET() {
  try {
    await dbConnect();
    const awards = await AwardModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: awards });
  } catch (error) {
    console.error("Error fetching awards:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch awards" },
      { status: 500 }
    );
  }
}

// POST - Create new award
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();
    
    const award = new AwardModel(body);
    await award.save();
    
    return NextResponse.json(
      { success: true, data: award, message: "Award created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating award:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create award" },
      { status: 500 }
    );
  }
}

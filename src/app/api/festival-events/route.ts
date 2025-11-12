import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import FestivalEventModel from "@/models/FestivalEvent";
import { getToken } from "next-auth/jwt";

// GET - Fetch all festival events
export async function GET() {
  try {
    await dbConnect();
    const events = await FestivalEventModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching festival events:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch festival events" },
      { status: 500 }
    );
  }
}

// POST - Create new festival event
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
    
    const event = new FestivalEventModel(body);
    await event.save();
    
    return NextResponse.json(
      { success: true, data: event, message: "Festival event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating festival event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create festival event" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import FestivalEventModel from "@/models/FestivalEvent";
import { getToken } from "next-auth/jwt";

// GET - Fetch single festival event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const event = await FestivalEventModel.findById(params.id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Festival event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching festival event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch festival event" },
      { status: 500 }
    );
  }
}

// PUT - Update festival event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const event = await FestivalEventModel.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Festival event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: event, message: "Festival event updated successfully" }
    );
  } catch (error) {
    console.error("Error updating festival event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update festival event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete festival event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const event = await FestivalEventModel.findByIdAndDelete(params.id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Festival event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Festival event deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting festival event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete festival event" },
      { status: 500 }
    );
  }
}

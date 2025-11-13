import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import EventModel from "@/models/Event";
import { getToken } from "next-auth/jwt";
import { deleteCloudinaryFiles } from "@/lib/cloudinary";

// GET - Fetch single event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const event = await EventModel.findById(id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PUT - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;
    
    const event = await EventModel.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: event, message: "Event updated successfully" }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;
    const event = await EventModel.findById(id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    // Delete the event from database
    await EventModel.findByIdAndDelete(id);

    // Delete files from Cloudinary (don't wait for completion)
    if (event.images && event.images.length > 0) {
      deleteCloudinaryFiles(event.images).catch(error => 
        console.error('Error deleting Cloudinary files:', error)
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Event deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete event" },
      { status: 500 }
    );
  }
}

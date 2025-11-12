import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AwardModel from "@/models/Award";
import { getToken } from "next-auth/jwt";
import { deleteCloudinaryFiles } from "@/lib/cloudinary";

// GET - Fetch single award
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const award = await AwardModel.findById(params.id);
    
    if (!award) {
      return NextResponse.json(
        { success: false, message: "Award not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: award });
  } catch (error) {
    console.error("Error fetching award:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch award" },
      { status: 500 }
    );
  }
}

// PUT - Update award
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
    
    const award = await AwardModel.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!award) {
      return NextResponse.json(
        { success: false, message: "Award not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: award, message: "Award updated successfully" }
    );
  } catch (error) {
    console.error("Error updating award:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update award" },
      { status: 500 }
    );
  }
}

// DELETE - Delete award
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
    const award = await AwardModel.findById(params.id);
    
    if (!award) {
      return NextResponse.json(
        { success: false, message: "Award not found" },
        { status: 404 }
      );
    }

    // Delete the award from database
    await AwardModel.findByIdAndDelete(params.id);

    // Delete files from Cloudinary (don't wait for completion)
    if (award.images && award.images.length > 0) {
      deleteCloudinaryFiles(award.images).catch(error => 
        console.error('Error deleting Cloudinary files:', error)
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Award deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting award:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete award" },
      { status: 500 }
    );
  }
}

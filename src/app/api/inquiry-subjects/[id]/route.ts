import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InquirySubjectModel from "@/models/InquirySubject";
import { getToken } from "next-auth/jwt";

// GET - Fetch single inquiry subject
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const subject = await InquirySubjectModel.findById(id);

    if (!subject) {
      return NextResponse.json(
        { success: false, message: "Inquiry subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: subject });
  } catch (error) {
    console.error("Error fetching inquiry subject:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiry subject" },
      { status: 500 }
    );
  }
}

// PUT - Update inquiry subject
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const subject = await InquirySubjectModel.findByIdAndUpdate(
      id,
      { name: body.name?.trim() },
      { new: true, runValidators: true }
    );

    if (!subject) {
      return NextResponse.json(
        { success: false, message: "Inquiry subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: subject,
      message: "Inquiry subject updated successfully",
    });
  } catch (error) {
    console.error("Error updating inquiry subject:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update inquiry subject" },
      { status: 500 }
    );
  }
}

// DELETE - Delete inquiry subject
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;
    const subject = await InquirySubjectModel.findByIdAndDelete(id);

    if (!subject) {
      return NextResponse.json(
        { success: false, message: "Inquiry subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry subject deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inquiry subject:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry subject" },
      { status: 500 }
    );
  }
}

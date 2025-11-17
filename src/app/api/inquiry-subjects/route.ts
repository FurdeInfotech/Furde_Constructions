import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InquirySubjectModel from "@/models/InquirySubject";
import { getToken } from "next-auth/jwt";

// GET - Fetch all inquiry subjects
export async function GET() {
  try {
    await dbConnect();
    const subjects = await InquirySubjectModel.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: subjects });
  } catch (error) {
    console.error("Error fetching inquiry subjects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiry subjects" },
      { status: 500 }
    );
  }
}

// POST - Create new inquiry subject
export async function POST(request: NextRequest) {
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

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { success: false, message: "Subject name is required" },
        { status: 400 }
      );
    }

    const subject = new InquirySubjectModel({ name: body.name.trim() });
    await subject.save();

    return NextResponse.json(
      {
        success: true,
        data: subject,
        message: "Inquiry subject created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating inquiry subject:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create inquiry subject" },
      { status: 500 }
    );
  }
}

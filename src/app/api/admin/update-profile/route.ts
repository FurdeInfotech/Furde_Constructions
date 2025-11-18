import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/models/Admin";

export async function PUT(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token || !token.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { oldEmail, newEmail, oldPassword, newPassword } = body;

    if (!oldEmail || !newEmail || !oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid new email" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const admin = await AdminModel.findById(token.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    if (admin.email !== oldEmail) {
      return NextResponse.json(
        { success: false, message: "Current email is incorrect" },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, admin.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const existingAdminWithNewEmail = await AdminModel.findOne({
      email: newEmail,
      _id: { $ne: admin._id },
    });

    if (existingAdminWithNewEmail) {
      return NextResponse.json(
        { success: false, message: "New email is already in use" },
        { status: 409 }
      );
    }

    admin.email = newEmail;
    admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}

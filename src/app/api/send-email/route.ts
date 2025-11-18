import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import ContactEmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiry } = body;

    // Validate required fields
    if (!name || !email || !phone || !inquiry) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Furde Constructions <noreply@furdeconstructions.com>",
      to: ["info@furdeconstructions.com"],
      cc: ["roshan.shaharifi@gmail.com", "kunalfurdeinfotech@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmailTemplate({ name, email, phone, inquiry }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

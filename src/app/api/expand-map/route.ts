import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    return NextResponse.json({ finalUrl: response.url });
  } catch (error) {
    return NextResponse.json({ finalUrl: "" });
  }
}

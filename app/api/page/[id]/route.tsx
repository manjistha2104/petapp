// app/api/page/[id]/route.tsx

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Pages from "@/models/Page";
import { Types } from "mongoose";

async function setCORSHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, PUT, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// GET: /api/page/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }

  try {
    const page = await Pages.findById(id);
    if (!page) {
      return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: page }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// PUT: /api/page/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = params;
  const { privacyPolicy, termsConditions, refundPolicy } = await req.json();


  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }

  try {
    const updated = await Pages.findByIdAndUpdate(
      id,
      { privacyPolicy, termsConditions, refundPolicy },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// DELETE: /api/page/:id
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }

  try {
    const deleted = await Pages.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Page deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

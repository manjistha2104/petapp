// app/api/page/route.js

import connectDB from "@/config/database";
import Pages from "@/models/Page";
import { NextResponse } from "next/server";

async function setCORSHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, PUT, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// Handle POST request
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { privacyPolicy, termsConditions, refundPolicy} = body;

    const page = new Pages({ privacyPolicy, termsConditions, refundPolicy});
    await page.save();
    console.log(page);

    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// Handle GET request
export async function GET() {
  await connectDB();

  try {
    const latest = await Pages.findOne().sort({ createdAt: -1 });


    return NextResponse.json({ success: true, data: latest }, { status: 200 });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

import connectDB from "@/config/database";
import { NextResponse, NextRequest } from "next/server";
import homepageModel from "@/models/homepage";

// Connect to the database
const connectDb = async () => {
  await connectDB();
};

// GET method to fetch homepage data
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const homepageData = await homepageModel.find(); // Fetch all homepage data
    return NextResponse.json(homepageData);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// POST method to create new homepage data
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json(); // Parse the JSON body of the request

    // Create new homepage document
    const newHomepageData = new homepageModel(body);
    await newHomepageData.save(); // Save the new document to the database

    return NextResponse.json(newHomepageData, { status: 201 });
  } catch (error) {
    console.error("Error creating homepage data:", error);
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

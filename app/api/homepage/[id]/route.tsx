import connectDB from "@/config/database";
import { NextResponse, NextRequest } from "next/server";
import homepageModel from "@/models/homepage";

// Connect to the database
const connectDb = async () => {
  await connectDB();
};

// GET method to fetch a specific homepage entry by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDb();
    const homepageData = await homepageModel.findById(id); // Fetch homepage data by ID

    if (!homepageData) {
      return NextResponse.json({ error: "Homepage entry not found" }, { status: 404 });
    }

    return NextResponse.json(homepageData);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// PUT method to update a specific homepage entry by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDb();
    const body = await req.json(); // Parse the JSON body of the request

    const updatedHomepageData = await homepageModel.findByIdAndUpdate(id, body, { new: true }); // Update the document

    if (!updatedHomepageData) {
      return NextResponse.json({ error: "Homepage entry not found" }, { status: 404 });
    }

    return NextResponse.json(updatedHomepageData);
  } catch (error) {
    console.error("Error updating homepage data:", error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

// DELETE method to delete a specific homepage entry by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDb();
    const deletedHomepageData = await homepageModel.findByIdAndDelete(id); // Delete the document

    if (!deletedHomepageData) {
      return NextResponse.json({ error: "Homepage entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Homepage entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting homepage data:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

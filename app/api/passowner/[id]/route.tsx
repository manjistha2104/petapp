import mongoose from "mongoose";
import ownerModel from "@/models/owner";
import connectDB from "@/config/database";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto"; // Use crypto for MD5 hashing

// Utility function for setting CORS headers
const setCORSHeaders = (response: NextResponse) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, PUT, DELETE, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

// MD5 hashing function
const hashPassword = (password: string) => {
  return crypto.createHash("md5").update(password).digest("hex");
};

// Handle GET request for fetching owner by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET request for owner by ID received");

  await connectDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const response = NextResponse.json(
      { message: "Invalid owner ID" },
      { status: 400 }
    );
    setCORSHeaders(response);
    return response;
  }

  try {
    const owner = await ownerModel.findById(id).populate({
      path: "pets",
      strictPopulate: false,
    });

    if (!owner) {
      const response = NextResponse.json(
        { message: "Owner not found" },
        { status: 404 }
      );
      setCORSHeaders(response);
      return response;
    }

    const response = NextResponse.json({ owner }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to get owner by ID:", error);
    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}

// Handle PUT request for updating owner by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("PUT request for owner by ID received");

  await connectDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const response = NextResponse.json(
      { message: "Invalid owner ID" },
      { status: 400 }
    );
    setCORSHeaders(response);
    return response;
  }

  try {
    const requestBody = await request.json();
    const { name, address, phoneno, email, password, pets } = requestBody;

    // Hash the password if it's provided for update
    const updateData: any = { name, address, phoneno, email, pets };
    if (password) {
      updateData.password = hashPassword(password);
    }

    const updatedOwner = await ownerModel
      .findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run validation for the update
      })
      .populate({
        path: "pets",
        strictPopulate: false,
      });

    if (!updatedOwner) {
      const response = NextResponse.json(
        { message: "Owner not found" },
        { status: 404 }
      );
      setCORSHeaders(response);
      return response;
    }

    const response = NextResponse.json(
      { message: "Owner updated", owner: updatedOwner },
      { status: 200 }
    );
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to update owner:", error);
    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}

// Handle DELETE request for deleting owner by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("DELETE request for owner by ID received");

  await connectDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const response = NextResponse.json(
      { message: "Invalid owner ID" },
      { status: 400 }
    );
    setCORSHeaders(response);
    return response;
  }

  try {
    const deletedOwner = await ownerModel.findByIdAndDelete(id);

    if (!deletedOwner) {
      const response = NextResponse.json(
        { message: "Owner not found" },
        { status: 404 }
      );
      setCORSHeaders(response);
      return response;
    }

    const response = NextResponse.json(
      { message: "Owner deleted" },
      { status: 200 }
    );
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to delete owner:", error);
    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  setCORSHeaders(response);
  return response;
}

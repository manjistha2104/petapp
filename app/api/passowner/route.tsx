import mongoose from "mongoose";
import ownerModel from "@/models/owner";
import petModel from "@/models/pet";
import connectDB from "@/config/database";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto"; // Use crypto for MD5 hashing

// Utility function for setting CORS headers
const setCORSHeaders = (response) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, PUT, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

// MD5 hashing function
const hashPassword = (password) => {
  return crypto.createHash("md5").update(password).digest("hex");
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  console.log("OPTIONS request received");
  const response = NextResponse.json({}, { status: 200 });
  setCORSHeaders(response);
  return response;
}

// POST: Create a new owner
export async function POST(request) {
  console.log("POST request received");

  try {
    const requestBody = await request.json();
    console.log("Request body:", requestBody);

    const { name, address, phoneno, email, password, pets } = requestBody;

    // Basic validation for required fields
    if (!name || !address || !phoneno || !email || !password) {
      return setCORSHeaders(
        NextResponse.json(
          {
            message:
              "Missing required fields (name, address, phoneno, email, password)",
          },
          { status: 400 }
        )
      );
    }

    // Hash the password using MD5 before saving it to the database
    const hashedPassword = hashPassword(password);

    await connectDB();

    const newOwner = await ownerModel.create({
      name,
      address,
      phoneno,
      email,
      password: hashedPassword, // Save the hashed password using MD5
      pets, // Ensure pets are an array of ObjectIds
    });

    const response = NextResponse.json(
      {
        message: "Owner Created",
        owner: { ...newOwner.toObject(), password: undefined },
      },
      { status: 201 }
    );
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to create owner:", error);

    let response;
    if (error.name === "ValidationError") {
      response = NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    } else {
      response = NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }

    setCORSHeaders(response);
    return response;
  }
}

// GET: Fetch owners based on query parameter or fetch all owners
export async function GET(request) {
  console.log("GET request received");

  await connectDB();

  // Ensure that the Pet model is registered
  petModel;

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    let query = {};
    if (email) {
      query = { email }; // Filter by email if provided
    }

    const owners = await ownerModel.find(query).populate({
      path: "pets",
      strictPopulate: false, // Disable strict populate check
    });

    if (email && owners.length === 0) {
      // If email is provided but no owner is found, return 404
      const response = NextResponse.json(
        { message: "Owner with this email not found" },
        { status: 404 }
      );
      setCORSHeaders(response);
      return response;
    }

    // Return all owners or filtered owner based on email query parameter
    const response = NextResponse.json({ owners }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to get Owners:", error);
    let response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}

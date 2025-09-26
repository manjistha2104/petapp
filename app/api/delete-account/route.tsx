import ownerModel from "@/models/owner";
import petModel from "@/models/pet";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Utility function for setting CORS headers
const setCORSHeaders = (response: any) => {
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

// DELETE: Delete an owner account if username and password are correct
export async function DELETE(request) {
  console.log("DELETE request received");

  try {
    const requestBody = await request.json();
    console.log("Request body:", requestBody);

    const { username, password } = requestBody;

    if (!username || !password) {
      return setCORSHeaders(
        NextResponse.json(
          { message: "Missing required fields (username, password)" },
          { status: 400 }
        )
      );
    }

    const hashedPassword = hashPassword(password);
    await connectDB();

    const owner = await ownerModel.findOne({
      email: username,
      password: hashedPassword,
    });

    if (!owner) {
      return setCORSHeaders(
        NextResponse.json(
          { message: "Invalid username or password" },
          { status: 401 }
        )
      );
    }

    await petModel.deleteMany({ _id: { $in: owner.pets } });
    await ownerModel.deleteOne({ _id: owner._id });

    const response = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to delete account:", error);

    const response = NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
    setCORSHeaders(response);
    return response;
  }
}

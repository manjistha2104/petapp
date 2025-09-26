import mongoose from "mongoose";
import connectDB from "@/config/database";
import bookingModel from "@/models/booking"; // Import Booking model
import { NextResponse, NextRequest } from "next/server";

// Function to set CORS headers
async function setCORSHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, PUT, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// Utility: Generate unique booking ID
function generateBookingId() {
  return `BK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  console.log("OPTIONS request received");
  const response = NextResponse.json({}, { status: 200 });
  await setCORSHeaders(response);
  return response;
}

// GET: Retrieve all bookings
export async function GET() {
  console.log("GET request received");

  try {
    await connectDB();
    const bookings = await bookingModel.find();

    console.log("Bookings retrieved successfully:", bookings);

    const response = NextResponse.json({ bookings }, { status: 200 });
    await setCORSHeaders(response);
    return response;
  } catch (error: any) {
    console.error("Failed to retrieve bookings:", error);

    const response = NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
    await setCORSHeaders(response);
    return response;
  }
}

// POST: Create a new booking
export async function POST(request: NextRequest) {
  console.log("POST request received");

  try {
    const requestBody = await request.json();
    console.log("Request body:", requestBody);

    const {
      selectedService,
      selectedSubService,
      ownerId,
      petId,
      phoneNumber,
      transactionId,
      paymentstatus,
      regularprice,
      sellprice,
      questions,
      bookingDate,
      selectedTimeSlot,
      status, // default "pending"
      rating,
      feedback,
    } = requestBody;

    await connectDB();

    // Generate unique booking ID
    const bookingId = generateBookingId();

    const newBookingData: any = {
      bookingId, // ✅ Save bookingId in DB
      selectedService,
      selectedSubService,
      ownerId,
      petId,
      phoneNumber,
      transactionId,
      paymentstatus,
      regularprice,
      sellprice,
      questions,
      bookingDate,
      selectedTimeSlot,
      status: status || "pending",
    };

    if (status === "completed") {
      if (rating !== undefined) newBookingData.rating = rating;
      if (feedback !== undefined) newBookingData.feedback = feedback;
    }

    const newBooking = await bookingModel.create(newBookingData);

    console.log("Booking created successfully:", newBooking);

    const response = NextResponse.json(
      {
        message: "Booking Created",
        booking: newBooking,
        bookingId, // ✅ return bookingId in response
      },
      { status: 201 }
    );
    await setCORSHeaders(response);
    return response;
  } catch (error: any) {
    console.error("Failed to create booking:", error);

    let response;
    if (error.name === "ValidationError") {
      response = NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    } else {
      response = NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }

    await setCORSHeaders(response);
    return response;
  }
}

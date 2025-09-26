import notificationModel from "@/models/notification"; // Assuming you have an owner model in this path
import connectDB from "@/config/database";
import { NextResponse, NextRequest } from "next/server";


async function setCORSHeaders(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }



  export async function OPTIONS() {
    let response = NextResponse.json({}, { status: 200 });
    setCORSHeaders(response);
    return response;
  }
  
  export async function POST(request: Request) {
    try {
      const requestBody = await request.json();
      console.log("Received POST request data:", requestBody); // Logging the POST data
  
      await connectDB();
      const newNotification = await notificationModel.create(requestBody);
  
      let response = NextResponse.json(
        { message: "Notification Created" },
        { status: 201 }
      );
      setCORSHeaders(response);
      return response;
    } catch (error) {
      console.error("Failed to create notification:", error);
      let response = NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
      setCORSHeaders(response);
      return response;
    }
  }
  
  export async function GET() {
    try {
      await connectDB();
      const notifications = await notificationModel.find();
  
      let response = NextResponse.json({ notifications }, { status: 200 });
      setCORSHeaders(response);
      return response;
    } catch (error) {
      console.error("Failed to get notifications:", error);
      let response = NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
      setCORSHeaders(response);
      return response;
    }
  }




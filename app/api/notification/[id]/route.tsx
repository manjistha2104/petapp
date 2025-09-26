import notificationModel from "@/models/notification"; // Assuming the model is here
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

async function setCORSHeaders(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, PUT, DELETE, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
}

// Handler for the OPTIONS request
export async function OPTIONS() {
    let response = NextResponse.json({}, { status: 200 });
    setCORSHeaders(response);
    return response;
}

// Handler for the GET request to fetch a specific notification by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const notification = await notificationModel.findById(params.id);

        if (!notification) {
            let response = NextResponse.json(
                { message: "Notification not found" },
                { status: 404 }
            );
            setCORSHeaders(response);
            return response;
        }

        let response = NextResponse.json({ notification }, { status: 200 });
        setCORSHeaders(response);
        return response;
    } catch (error) {
        console.error("Failed to get notification:", error);
        let response = NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
        setCORSHeaders(response);
        return response;
    }
}

// Handler for the PUT request to update a specific notification by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const requestBody = await request.json();
        await connectDB();
        
        const updatedNotification = await notificationModel.findByIdAndUpdate(params.id, requestBody, { new: true });

        if (!updatedNotification) {
            let response = NextResponse.json(
                { message: "Notification not found" },
                { status: 404 }
            );
            setCORSHeaders(response);
            return response;
        }

        let response = NextResponse.json({ updatedNotification }, { status: 200 });
        setCORSHeaders(response);
        return response;
    } catch (error) {
        console.error("Failed to update notification:", error);
        let response = NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
        setCORSHeaders(response);
        return response;
    }
}

// Handler for the DELETE request to remove a specific notification by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        
        const deletedNotification = await notificationModel.findByIdAndDelete(params.id);

        if (!deletedNotification) {
            let response = NextResponse.json(
                { message: "Notification not found" },
                { status: 404 }
            );
            setCORSHeaders(response);
            return response;
        }

        let response = NextResponse.json({ message: "Notification Deleted" }, { status: 200 });
        setCORSHeaders(response);
        return response;
    } catch (error) {
        console.error("Failed to delete notification:", error);
        let response = NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
        setCORSHeaders(response);
        return response;
    }
}

import { NextResponse } from "next/server";
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import bannerModel from "@/models/banner"; // Assuming bannerModel is defined
import connectDB from "@/config/database"; // Database connection utility

// Initialize S3 client using environment variables for AWS credentials
const s3 = new S3Client({
  region: "ap-south-1", // Set the correct AWS region directly or use process.env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from environment variable
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Secret key from environment variable
  },
});

// Ensure MongoDB connection is established
await connectDB();

// GET a specific banner by its ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the specific banner by ID
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // Return the banner details
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error("Error fetching banner:", error);
    return NextResponse.json(
      { error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}

// PUT to update a specific banner by its ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await req.formData();
    const name = formData.get("name");
    const file = formData.get("image") as File | null;

    // Find the existing banner by ID
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // Update the banner name
    if (name) {
      banner.name = name;
    }

    // If a new image is uploaded, upload to S3 and update image URL
    if (file) {
      console.log(`Uploading new image for banner: ${name}`);

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Define the S3 upload parameters
      const params = {
        Bucket: "bucket-y7le7h", // Replace with your actual S3 bucket name
        Key: `banner/${banner.name}-${file.name}`, // Store the file in the "banner" folder
        Body: buffer,
        ACL: "public-read", // Make the object publicly accessible
        ContentType: file.type || "application/octet-stream", // Set the content type based on the file type
      };

      // Upload the new image to S3
      const command = new PutObjectCommand(params);
      await s3.send(command);

      // Explicitly define the region for the image URL
      const region = "ap-south-1";
      const imageUrl = `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`;

      // Update the image URL in the banner
      banner.imageUrl = imageUrl;
    }

    // Save the updated banner
    await banner.save();

    // Return success with updated banner
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE a specific banner by its ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the banner by ID
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // Extract file name from the S3 URL
    const fileName = banner.imageUrl.split("/").pop();

    // Delete the image from S3
    const deleteParams = {
      Bucket: "bucket-y7le7h", // Replace with your actual S3 bucket name
      Key: `banner/${fileName}`, // Delete the file from the "banner" folder
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);

    // Delete the banner from the database
    await bannerModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client using environment variables for AWS credentials
const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1", // Set the correct AWS region from environment
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from environment variable
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Secret key from environment variable
  },
});

export async function POST(req) {
  // Validate content type to ensure we are receiving form data
  const contentType = req.headers.get("content-type");
  if (!contentType?.startsWith("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type, expected multipart/form-data" },
      { status: 400 }
    );
  }

  try {
    // Extract formData from the request
    const formData = await req.formData();

    // Get the file and image name from formData
    const file = formData.get("file");
    const imageName = formData.get("imageName");

    // Validate the file and image name
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded, please provide a valid file." },
        { status: 400 }
      );
    }

    if (!imageName) {
      return NextResponse.json(
        { error: "No image name provided, please provide a valid image name." },
        { status: 400 }
      );
    }

    // Log file details for debugging purposes
    console.log("Uploading File:", {
      fileName: file.name,
      fileType: file.type,
      imageName: imageName,
    });

    // Convert the file into a buffer for S3 upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set up S3 upload parameters
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "bucket-y7le7h", // Replace with your actual S3 bucket name or use from environment
      Key: imageName, // Use imageName as the S3 object key
      Body: buffer, // File content
      ContentType: file.type || "application/octet-stream", // Default to application/octet-stream if no type is provided
    };

    // Upload the file to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Construct the public URL for the uploaded file
    const imageUrl = `https://${
      process.env.AWS_S3_BUCKET_NAME || "bucket-y7le7h"
    }.s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${imageName}`;

    console.log("File uploaded successfully:", imageUrl);

    // Return a success response with the file's public URL
    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Error during file upload:", error);

    // Handle different types of errors and return appropriate messages
    return NextResponse.json(
      { error: `Failed to upload file: ${error.message}` },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client using environment variables for AWS credentials
const s3 = new S3Client({
  region: 'ap-south-1', // Set the correct AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from environment variable
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Secret key from environment variable
  },
});

export async function POST(req) {
  // Validate content type
  if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    // Get the file and associated names from formData
    const file = formData.get('file');
    const imageName = formData.get('imageName');
    
    // Initialize an array to hold all the file upload promises
    const fileUploads = [];

    // Upload the 'file' to S3
    let imageUrl = '';
    if (file && imageName) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const params = {
        Bucket: 'bucket-y7le7h', // Replace with your actual S3 bucket name
        Key: imageName, // File name for the S3 object
        Body: buffer, // File content
        ACL: 'public-read', // Object is publicly accessible
        ContentType: file.type || 'application/octet-stream', // Default to application/octet-stream if no type is provided
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);

      // Construct the public URL for the uploaded file
      imageUrl = `${imageName}`;
    }

    // Return a success response along with the uploaded image URL
    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}

export const runtime = 'nodejs';

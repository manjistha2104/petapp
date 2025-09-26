import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req, { params }: { params: { id: string } }) {
  if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const imageName = params.id; // Extract the dynamic `id` parameter from the URL

    if (!file || !imageName) {
      return NextResponse.json({ error: "File or image name is missing" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadDir = "/var/www/petapp/uploads";
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, imageName);

    // Save the file
    fs.writeFileSync(filePath, buffer);

    console.log(`Image saved at: ${filePath}`);  // Debug log

    const imageUrl = `https://www.causeforpaws.in/uploads/${imageName}`;

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

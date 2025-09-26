import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bannerModel from "@/models/banner";
import connectDB from "@/config/database";

// Ensure MongoDB connection is established
await connectDB();

export async function POST(req) {
  if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const newBanners = [];

    const images = formData.getAll("image");
    const names = formData.getAll("name");

    const uniqueNames = [...new Set(names)];
    const bannerTitle = "Homepage Banners";

    let existingBannerCollection = await bannerModel.findOne({ title: bannerTitle });
    const existingBanners = existingBannerCollection?.banners || [];

    let fileIndex = 0;
    const uploadDir = "/var/www/petapp/uploads/banner";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (let i = 0; i < uniqueNames.length; i++) {
      const bannerName = uniqueNames[i];
      const existingBanner = existingBanners.find(
        (banner) => banner.name === bannerName
      );

      if (existingBanner) {
        newBanners.push(existingBanner);
        continue;
      }

      if (fileIndex >= images.length || !images[fileIndex]) {
        return NextResponse.json(
          { error: `Missing file for banner: ${bannerName}` },
          { status: 400 }
        );
      }

      const file = images[fileIndex];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(uploadDir, `${bannerName}-${file.name}`);

      fs.writeFileSync(filePath, buffer);
      const imageUrl = `https://www.causeforpaws.in/uploads/banner/${bannerName}-${file.name}`;

      newBanners.push({ name: bannerName, imageUrl });
      fileIndex++;
    }

    const bannersToDelete = existingBanners.filter(
      (existingBanner) => !uniqueNames.includes(existingBanner.name)
    );

    for (const banner of bannersToDelete) {
      const filePath = path.join(uploadDir, path.basename(banner.imageUrl));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const finalBanners = newBanners;

    if (existingBannerCollection) {
      existingBannerCollection.banners = finalBanners;
      await existingBannerCollection.save();
    } else {
      const newBannerCollection = new bannerModel({
        title: bannerTitle,
        banners: finalBanners,
      });
      await newBannerCollection.save();
    }

    return NextResponse.json({ success: true, banners: finalBanners });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const banners = await bannerModel.find();
    return NextResponse.json({ success: true, banners });
  } catch (error) {
    console.error("Error fetching banners from database:", error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
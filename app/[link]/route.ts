import connectDB from "@/db";
import Link from "@/models/Link";
import { NextResponse } from "next/server";

type Params = {
  link: string;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    const url = request.url;
    // const link = context.params.link;
    // console.log("link:", link);
    // const forDev = `https://smlink.vercel.app/${link}`;
    if (!url) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 401 }
      );
    }
    await connectDB();
    const savedURL = await Link.findOne({
      shortUrl: url,
    });
    if (!savedURL) {
      return NextResponse.json({ message: "Link not found" }, { status: 401 });
    }
    const ipAddress = request.headers?.get("x-forwarded-for") || "";
    const userAgent = request.headers?.get("user-agent") || "";
    // Fetching Geo Location
    let locationData: {
      city?: string;
      region?: string;
      country?: string;
    } = {};
    if (ipAddress) {
      locationData = await getGeoLocation(ipAddress);
    }
    // Ensure clickDetails is an array
    if (!savedURL.clickDetails) {
      savedURL.clickDetails = [];
    }

    savedURL.clicks += 1;
    savedURL.clickDetails.push({
      ip: ipAddress,
      city: locationData.city || locationData.region || "",
      country: locationData.country || "",
      userAgent: userAgent,
    });
    await savedURL.save();

    return NextResponse.redirect(savedURL.original);
  } catch (error) {
    console.error("Error querying database:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}

async function getGeoLocation(ip: string) {
  const response = await fetch(
    `https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`
  );
  const data = await response.json();
  return data;
}

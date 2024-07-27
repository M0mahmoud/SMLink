"use server";
import connectDB from "@/db";
import { AuthFormState, LinkDocument } from "@/lib/definitions";
import { generateShortUrl } from "@/lib/shortlink";
import Link from "@/models/Link";
import { verifySession } from "@/session";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function shortLinkFormAction(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const original = formData.get("original");

  const { isAuth, userId } = await verifySession();
  if (!isAuth) {
    return {
      message: "Must Login First :)",
    };
  }

  const shortUrl = await generateShortUrl();
  try {
    await connectDB();
    const newShortURL = await Link.create({
      user: new ObjectId(userId as string),
      original: original,
      shortUrl,
    });

    if (!newShortURL) {
      return {
        errors: {
          url: ["An error occurred while creating the short link."],
        },
      };
    }

    return {
      message: "Short link created successfully",
    };
  } catch (error) {
    console.error("Error creating short link:", error);
    return {
      message:
        "An error occurred while creating the short link. Please try again.",
    };
  }
}

export async function getLinksAction(): Promise<LinkData[]> {
  try {
    const { isAuth, userId } = await verifySession();
    if (!isAuth) {
      redirect("/login");
    }
    const links = await Link.find({
      user: new ObjectId(userId as string),
    }).select("shortUrl original clicks createdAt -_id");

    const formattedLinks = links.map((link) => ({
      shortUrl: link.shortUrl,
      original: link.original,
      clicks: link.clicks,
      createdAt: link.createdAt,
    }));

    return formattedLinks;
  } catch (error) {
    console.error("Error fetching links:", error);
    return [];
  }
}
export interface LinkData {
  shortUrl: string;
  original: string;
  clicks: number;
  createdAt: Date;
}

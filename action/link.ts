"use server";
import connectDB from "@/db";
import { AuthFormState } from "@/lib/definitions";
import { generateShortUrl } from "@/lib/shortlink";
import Link from "@/models/Link";
import { verifySession } from "@/session";
import { ObjectId } from "mongodb";

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

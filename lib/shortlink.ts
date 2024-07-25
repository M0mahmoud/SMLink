import crypto from "crypto";

export async function generateShortUrl(): Promise<string> {
  const shortUrl = crypto.randomBytes(3).toString("hex"); // Generates a 6-character short URL
  return process.env.NEXT_PUBLIC_URL + shortUrl;
}

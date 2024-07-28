"use server";
import connectDB from "@/db";
import User from "@/models/User";
import { verifySession } from "@/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function getUser() {
  try {
    const { isAuth, userId } = await verifySession();
    if (!isAuth || !userId) {
      redirect("/login");
    }

    await connectDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    return user;
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

"use server";
import connectDB from "@/db";

import {
  AuthFormState,
  LoginFormSchema,
  SignUpFormState,
} from "@/lib/definitions";
import User from "@/models/User";
import { createSession } from "@/session";

import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signupAction(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validation = SignUpFormState.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { email, name, password } = validation.data;
  try {
    await connectDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        message: "Invalid login credentials.",
      };
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    const userId = user._id.toString();
    await createSession(userId);
    return { redirect: "/" };
  } catch (error) {
    console.error("Error finding user or creating session:", error);
    return { message: "An error occurred. Please try again later." };
  }
}

export async function loginAction(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validation = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validation.data;

  try {
    await connectDB();
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return { message: "Invalid login credentials." };
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return { message: "Invalid login credentials." };
    }
    const userId = user._id.toString();
    await createSession(userId);
    return { redirect: "/" };
  } catch (error) {
    console.error("Error-login:", error);
    return { message: "An error occurred. Please try again later." };
  }
}

export async function logout() {
  cookies().delete("session");
  redirect("/login");
}

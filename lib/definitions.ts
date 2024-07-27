import { Types } from "mongoose";
import { object, string } from "zod";
export type AuthFormState =
  | {
      errors?: {
        url?: string[];
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      redirect?: string;
    }
  | undefined;

export const SignUpFormState = object({
  name: string()
    .min(5, { message: "Name must be at least 5 characters long." })
    .trim(),
  email: string().email({ message: "Enter a valid email." }).trim(),
  password: string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = object({
  email: string().email({ message: "Please enter a valid email." }),
  password: string().min(1, { message: "Password field must not be empty." }),
});

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// For Now
export interface LinkDocument {
  user?: Types.ObjectId;
  original: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt?: Date;
  clickDetails?: ClickDetail[];
}
export interface ClickDetail {
  ip: string;
  city?: string;
  country?: string;
  timeOfClick: Date;
  userAgent?: string;
}

import { LinkDocument } from "@/lib/definitions";
import { model, models, Schema } from "mongoose";

const LinkSchema = new Schema<LinkDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    original: {
      type: String,
      required: [true, "URL is required"],
      match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "URL is invalid"],
    },
    shortUrl: {
      type: String,
      unique: true,
      required: [true, "Short URL is required"],
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Link = models?.Link || model<LinkDocument>("Link", LinkSchema);
export default Link;

import mongoose, { Schema } from "mongoose";
const postTagSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    tagId: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


export const PostTag = mongoose.model("PostTag", postTagSchema);

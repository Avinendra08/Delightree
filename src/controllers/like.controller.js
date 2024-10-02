import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

// Add a like
export const addLike = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;
  const post = await Post.findById(postId);
  const user = await User.findById(userId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Checking if the like already exists
  const existingLike = await Like.findOne({ postId, userId });
  if (existingLike) {
    res.status(400);
    throw new Error("You have already liked this post");
  }

  const newLike = new Like({ postId, userId });
  await newLike.save();

  res.status(201).json({ message: "Post liked successfully", like: newLike });
});

export const removeLike = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;
  const like = await Like.findOneAndDelete({ postId, userId });

  if (!like) {
    res.status(404);
    throw new Error("Like not found");
  }

  res.status(200).json({ message: "Like removed successfully" });
});

export const getLikesByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const likes = await Like.find({ postId }).populate("userId", "name email");

  res.status(200).json({ message: `Total likes for post: ${likes.length}`, likes });
});

export const getLikesByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const likes = await Like.find({ userId }).populate("postId", "title content");

  res.status(200).json({ message: `Total likes by user: ${likes.length}`, likes });
});

export const getAllLikes = asyncHandler(async (req, res) => {
  const likes = await Like.find().populate("postId userId", "title name email");

  res.status(200).json({ message: `Total likes: ${likes.length}`, likes });
});

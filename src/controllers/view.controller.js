import { View } from "../models/view.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const bulkUploadViews = asyncHandler(async (req, res) => {
    const viewsArray = req.body;
  
    const createdViews = [];
  
    for (let viewData of viewsArray) {
      const { postId, userId } = viewData;
  
      // Check if post and user exist
      const post = await Post.findById(postId);
      const user = await User.findById(userId);
  
      if (!post) {
        res.status(404);
        throw new Error(`Post with ID ${postId} not found`);
      }
  
      if (!user) {
        res.status(404);
        throw new Error(`User with ID ${userId} not found`);
      }
  
      // Check if the view already exists
      const existingView = await View.findOne({ postId, userId });
      if (existingView) {
        continue; // Skip the existing view
      }
  
      // Create new view
      const newView = new View({ postId, userId });
      await newView.save();
      createdViews.push(newView);
    }
  
    if (createdViews.length === 0) {
      res.status(400);
      throw new Error("No new views created, all views already exist");
    }
  
    res.status(201).json({
      message: `${createdViews.length} views uploaded successfully`,
      views: createdViews,
    });
  });

export const addView = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  // Check if post and user exist
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

  // Check if the view already exists
  const existingView = await View.findOne({ postId, userId });
  if (existingView) {
    res.status(400);
    throw new Error("You have already viewed this post");
  }

  // Create new view
  const newView = new View({ postId, userId });
  await newView.save();

  res.status(201).json({ message: "Post viewed successfully", view: newView });
});

// Remove a view
export const removeView = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  // Find and delete the view
  const view = await View.findOneAndDelete({ postId, userId });

  if (!view) {
    res.status(404);
    throw new Error("View not found");
  }

  res.status(200).json({ message: "View removed successfully" });
});

// Get all views for a post
export const getViewsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const views = await View.find({ postId }).populate("userId", "name email");

  res
    .status(200)
    .json({ message: `Total views for post: ${views.length}`, views });
});

// Get all views by a user
export const getViewsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const views = await View.find({ userId }).populate("postId", "title content");

  res
    .status(200)
    .json({ message: `Total views by user: ${views.length}`, views });
});

// Get all views
export const getAllViews = asyncHandler(async (req, res) => {
  const views = await View.find().populate("postId userId", "title name email");

  res.status(200).json({ message: `Total views: ${views.length}`, views });
});

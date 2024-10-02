import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from "../models/comment.model.js";

// Get all comments
export const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("userId postId");
    res.status(200).json(comments);
});

// Create a comment
export const createComment = asyncHandler(async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
});

// Get a single comment by ID
export const getCommentById = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate("userId postId");
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json(comment);
});

// Update a comment
export const updateComment = asyncHandler(async (req, res) => {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json(updatedComment);
});

// Delete a comment
export const deleteComment = asyncHandler(async (req, res) => {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json({ message: "Comment deleted" });
});
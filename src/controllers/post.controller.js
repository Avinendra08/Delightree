import { asyncHandler } from "../utils/asyncHandler.js";
import {Post} from "../models/post.model.js";

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("authorId");
    res.status(200).json(posts);
});

// Create a post
export const createPost = asyncHandler(async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
});

// Get a single post by ID
export const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate("authorId");
    if (!post) {
        res.status(404).json({ error: "Post not found" });
    } else {
        res.status(200).json(post);
    }
});

// Update a post
export const updatePost = asyncHandler(async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
        res.status(404).json({ error: "Post not found" });
    } else {
        res.status(200).json(updatedPost);
    }
});

// Delete a post
export const deletePost = asyncHandler(async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
        res.status(404).json({ error: "Post not found" });
    } else {
        res.status(200).json({ message: "Post deleted" });
    }
});

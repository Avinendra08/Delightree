import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
export const getUserActivityByAgeRange = asyncHandler(async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        // Step 1: Group users into age ranges, including a range for users below 18
        $addFields: {
          ageRange: {
            $switch: {
              branches: [
                { case: { $lt: ["$age", 18] }, then: "below 18" },
                {
                  case: {
                    $and: [{ $gte: ["$age", 18] }, { $lte: ["$age", 24] }],
                  },
                  then: "18-24",
                },
                {
                  case: {
                    $and: [{ $gte: ["$age", 25] }, { $lte: ["$age", 34] }],
                  },
                  then: "25-34",
                },
                {
                  case: {
                    $and: [{ $gte: ["$age", 35] }, { $lte: ["$age", 44] }],
                  },
                  then: "35-44",
                },
                { case: { $gte: ["$age", 45] }, then: "45+" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        // Step 2: Lookup posts, comments, likes, and views in parallel
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "authorId",
          as: "userPosts",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "userId",
          as: "userComments",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "userId",
          as: "userLikes",
        },
      },
      {
        $lookup: {
          from: "views",
          localField: "_id",
          foreignField: "userId",
          as: "userViews",
        },
      },
      {
        // Step 3: Group data by age range and calculate totals
        $group: {
          _id: "$ageRange",
          totalPosts: { $sum: { $size: "$userPosts" } },
          totalComments: { $sum: { $size: "$userComments" } },
          totalLikes: { $sum: { $size: "$userLikes" } },
          totalViews: { $sum: { $size: "$userViews" } },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

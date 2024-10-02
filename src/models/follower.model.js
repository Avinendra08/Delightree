import mongoose, { Schema } from "mongoose";

const followerSchema = new Schema(
    {
        followerId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        followeeId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    },
    {
        timestamps: true
    }
);


export const Follower = mongoose.model("Follower", followerSchema);

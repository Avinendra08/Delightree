import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    contactId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;

// db.createCollection("users", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["username", "email", "age", "createdAt"],
//       properties: {
//         username: { bsonType: "string" },
//         email: { bsonType: "string" },
//         age: { bsonType: "number" },
//         createdAt: { bsonType: "date" }
//       }
//     }
//   }
// });

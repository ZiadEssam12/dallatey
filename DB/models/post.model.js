import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String },
    missingPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MissingPerson",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

const Post = mongoose.model("Post", postSchema);

export default Post;

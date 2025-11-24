import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  price: Number,
  isNegotiable: Boolean,
  area: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  images: [String], // danh sách URL Cloudinary
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Post", PostSchema);

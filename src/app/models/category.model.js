import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "category",
  }
);

export default mongoose?.models?.category ||
  mongoose.model("category", categorySchema);

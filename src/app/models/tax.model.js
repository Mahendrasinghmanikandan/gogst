import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    tax_name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "tax",
  }
);

export default mongoose?.models?.tax ||
  mongoose.model("tax", taxSchema);

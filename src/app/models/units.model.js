import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    unit_name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "unit",
  }
);

export default mongoose?.models?.unit ||
  mongoose.model("unit", unitSchema);

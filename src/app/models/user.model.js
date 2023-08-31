import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

export default mongoose?.models?.user || mongoose.model("user", userSchema);

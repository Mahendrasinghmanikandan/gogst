import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    invoice_number: Number,
    invoice_date: Date,
    customer_name: String,
    items: Array
  },
  {
    timestamps: true,
    collection: "sales",
  }
);

export default mongoose?.models?.sales ||
  mongoose.model("sales", salesSchema);

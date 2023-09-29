import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    invoice_number: Number,
    invoice_date: Date,
    customer_name: String,
    items: Array
  },
  {
    timestamps: true,
    collection: "purchase",
  }
);

export default mongoose?.models?.purchase ||
  mongoose.model("purchase", purchaseSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    product_description: {
      type: String,
      require: true,
    },
    product_price: {
      type: Number,
      require: true,
    },
    product_category: {
      type: String,
      require: true,
    },
    product_tax_type: {
      type: String,
      require: true,
    },
    product_unit: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "product",
  }
);

export default mongoose?.models?.product ||
  mongoose.model("product", productSchema);

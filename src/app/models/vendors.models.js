import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendor_name: {
      type: String,
      require: true,
    },
    vendor_contact: {
      type: Number,
      require: true,
    },
    vendor_email: {
      type: String,
      require: true,
    },
    vendor_address: {
      type: String,
      require: true,
    },
    vendor_gst_number: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "vendor",
  }
);

export default mongoose?.models?.vendor || mongoose.model("vendor", vendorSchema);

"use server";
import { createConnection } from "../../../db/db";
import { NextResponse } from "next/server";
import Vendor from "../../../models/vendors.models";

export const DELETE = async (request, { params }) => {
  try {
    await createConnection();
    let data = JSON.parse(params.id);

    if (_.get(data, "from", "") === "multiple") {
      await Vendor.deleteMany({ _id: { $in: data.id } });
    } else {
      await Vendor.findByIdAndDelete({ _id: data.id });
    }
    return NextResponse.json({ data: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to Add Vendors" },
      { status: 500 }
    );
  }
};

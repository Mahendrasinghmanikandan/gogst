import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { get } from "lodash";

export const GET = async (request) => {
  try {
    if (get(cookies().get("token_value"), "value", "") === "") {
      return NextResponse.json({ message: "Token Not Found"},{status: 500 });
    }
    await jwt.verify(
      get(cookies().get("token_value"), "value", ""),
      process.env.Token_Key
    );
    return NextResponse.json({ message: "Start Your Journey" },{status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Token Not Found"},{ status: 500 });
  }
};

export const DELETE = async () => {
  try {
    cookies().delete("token_value");
    return NextResponse.json({
      message: "Logout successfully Completed",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "something went wrong"},{status: 500});
  }
};

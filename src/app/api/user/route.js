"use server";
import { NextResponse } from "next/server";
import User from "../../models/user.model";
import { createConnection } from "../../db/db";
import bcrypt from "bcrypt";
import { isEmpty, get } from "lodash";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    
    const { email, password, status = false } = await request.json();
    await createConnection();
    const formData = {
      email: email,
      password: await bcrypt.hash(password, 10),
    };
    let loginOrSave = await User.find({ email: email });
    if (isEmpty(loginOrSave)) {
      await User.create(formData);
      let tokenStoredData = {
        email: email,
      };
      let token = await jwt.sign(tokenStoredData, process.env.Token_Key);
      cookies().set("token_value", token);
      return NextResponse.json(
        { message: "Account Created successfully" },
        { status: 200 }
      );
    } else {
      let verify = await bcrypt.compare(
        password,
        get(loginOrSave, "[0].password", null)
      );
      if (verify) {
        let tokenStoredData = {
          email: get(loginOrSave, "[0].email", null),
        };
        let token = await jwt.sign(tokenStoredData, process.env.Token_Key);
        cookies().set("token_value", token);
        return NextResponse.json(
          { message: "Start Your journey" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Entered password Invalid" },
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

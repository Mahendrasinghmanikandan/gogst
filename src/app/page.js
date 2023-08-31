"use client";
import React, { useState } from "react";
import Login from "./component/Login";
import Image from "next/image";

const Page = () => {
  const [currentCom, setCurrentCom] = useState(true);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
       <div className="w-[50%]">
        <Image
          src="/assets/images/home.png"
          className="w-[70%] mt-10"
          width={900}
          height={900}
        />
      </div>
      <div className="w-[30%] p-10 shadow-lg rounded-2xl bg-white">
        <div >
          {currentCom ? (
            <Login currentCom={currentCom} setCurrentCom={setCurrentCom} />
          ) : (
            <h1>otp or forget password page</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

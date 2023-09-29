"use client";
import { Avatar, Divider } from "antd";
import React from "react";
import {
  BookOutlined,
  ContainerOutlined,
  UserSwitchOutlined,
  DollarOutlined,
  SettingOutlined,
  FileDoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Visual from "./Visual";

const Dashboard = () => {
  return (
    <div className="w-[100%] h-[100%]  flex justify-center pt-[120px]">
      <div className="w-[90%]  flex flex-col gap-y-5">
        <div className="flex items-center justify-between bg-white p-4 shadow-lg rounded">
          <div>
            <h1>Membership Expired</h1>
            <p className="text-sm">
              Your premium membership has been expired on 02/09/2023, So your
              account is changed to the free plan. Please renew today to avail
              premium benefits.
            </p>
          </div>
          <div className="w-[120px] h-[30px] bg-red-500 text-white flex items-center justify-center rounded-sm cursor-pointer">
            <h1>Renew Now</h1>
          </div>
        </div>
        <div className="flex items-start justify-between bg-white p-4 shadow-lg rounded flex-col">
          <h1 className="pb-4">Complete your profile</h1>
          {[
            {
              id: 1,
              title: "Add Your Business Logo",
              text: "Print your business logo on your invoice to Impress your customer with a beautiful invoice.",
              btnText: "Add Logo",
            },
            {
              id: 2,
              title: "Add Your Email Address",
              text: "This email address will be printed on your invoice also If you lost your phone you can log in to your account with this email address.",
              btnText: "Add Email",
            },
            {
              id: 3,
              title: "Add Your Bank & UPI Details",
              text: "Get a faster payment with a UPI QR code. These UPI & Bank details will be printed on your invoice.",
              btnText: "Add Bank",
            },
          ].map((res, index) => {
            return (
              <>
                <div className="flex items-center justify-between w-full ">
                  <div>
                    <h1>{res.title}</h1>
                    <p className="text-sm">{res.text}</p>
                  </div>
                  <div className="w-[120px] h-[30px] border-2 border-green-500 text-black flex items-center justify-center rounded-sm cursor-pointer">
                    <h1>{res.btnText}</h1>
                  </div>
                </div>
                <Divider />
              </>
            );
          })}
        </div>
        {/*  */}
        <Visual />
      </div>
    </div>
  );
};

export default Dashboard;

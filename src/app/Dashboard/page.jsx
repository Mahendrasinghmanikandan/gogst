"use client";
import { Avatar } from "antd";
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

const Dashboard = () => {
  return (
    <div className="w-[100%] h-[100%] pl-10">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex items-center justify-star gap-x-4 mt-10">
        {[
          {
            id: 1,
            name: "Vendors",
            total: 10,
            color: "#6fd943",
            icon: <UserSwitchOutlined />,
          },
          {
            id: 2,
            name: "Products",
            total: 60,
            color: "#3ec9d6",
            icon: <ContainerOutlined />,
          },
          {
            id: 3,
            name: "Sales",
            total: 10,
            color: "#ffa21d",
            icon: <DollarOutlined />,
          },
          {
            id: 3,
            name: "Purchase",
            total: 10,
            color: "#ff3a6e",
            icon: <FileDoneOutlined />,
          },
        ].map((res, index) => {
          return (
            <div className="w-[150px] h-[200px] bg-white shadow-lg rounded-lg flex flex-col items-start justify-start px-5 py-2 gap-y-4">
              <div
                style={{ background: res.color }}
                className={` flex items-center justify-center w-[35px] h-[35px] rounded-lg mt-4 text-white`}
              >
                {res.icon}
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="text-sm text-slate-500">Total</span>
                <h1 style={{ color: res.color }} className="font-semibold">{res.name}</h1>
              </div>
              <h1 className="text-[#6fd943] text-2xl font-bold">{res.total}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

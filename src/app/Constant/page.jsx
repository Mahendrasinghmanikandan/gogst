"use client";
import { Tabs } from "antd";
import React from "react";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Category from "./Category";
import Units from "./Units";
import Tax from "./Tax";

const Constant = () => {
  const items = [
    {
      key: "1",
      label: "Categories",
      children: <Category />,
    },
    {
      key: "2",
      label: "Units",
      children: <Units />,
    },
    {
      key: "3",
      label: "TAX Types",
      children: <Tax />,
    },
  ];

  return (
    <div className="w-[100%] flex justify-center">
      <div className="w-[98%] mt-10">
        <Tabs
          tabPosition="right"
          type="line"
          className="!w-full !h-full"
          destroyInactiveTabPane
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
};

export default Constant;

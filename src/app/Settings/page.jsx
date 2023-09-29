"use client";
import { Tabs } from "antd";
import React from "react";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Brand from "./Brand";
import Company from "./Company";
import Themes from "./Theme";

const Settings = () => {
  const items = [
    {
      key: "1",
      label: "Brand Settings",
      children:<Brand/>,
    },
    {
      key: "2",
      label: "Company Settings",
      children:<Company/>,
    },
    {
      key: "3",
      label: "Theme Settings",
      children: <Themes/>,
    },
    {
      key: "4",
      label: "Privacy Settings",
      children: " <Tax />",
    },
  ];

  return (
    <div className="w-[100%] flex justify-center pt-[120px]">
      <div className="w-[90%] mt-10">
        <Tabs
          tabPosition="left"
          type="line"
          className="!w-full !h-full  min-h-[70vh]  "
          destroyInactiveTabPane
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
};

export default Settings;

import Image from "next/image";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { items } from "../helper/menu";
import { Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";

const Sidenavbar = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div className="w-[100%] flex flex-col items-center h-screen">
      <div className=" flex flex-col w-[100%] gap-y-2 h-[calc(100vh-50px)] bg-green-500 overflow-y-scroll">
        <Menu
          onClick={(e) => {
            router.push(e.key);
          }}
          defaultSelectedKeys={path}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          // inlineCollapsed={collapsed}
          items={items}
          className="!border-none bg-green-500"
        />
      </div>
    </div>
  );
};

export default Sidenavbar;

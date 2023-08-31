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
      <div className="mt-10">
        <Image src="/assets/images/logo.png" width={100} height={100} />
      </div>
      <div className="mt-5 flex flex-col w-[100%] gap-y-2 h-[85vh] overflow-y-scroll">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((res, index) => {
          return (
            <div className="w-[100%]  flex items-center justify-start gap-x-2 bg-green-500 h-[50px] rounded-md pl-2 shadow-2xl">
              <div className="bg-white shadow-2xl w-[40px] h-[40px] rounded-lg  flex items-center justify-center">
                <HomeOutlined />
              </div>
              <div>
                <h1>Dashboard</h1>
              </div>
            </div>
          );
        })} */}
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
          className="!border-none"
        />
      </div>
    </div>
  );
};

export default Sidenavbar;

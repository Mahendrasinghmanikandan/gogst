import {
  LaptopOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Tag } from "antd";
import React from "react";
import { items } from "../helper/menu";
import { useRouter, usePathname } from "next/navigation";
import { logoutUser } from "../helper/apiHelper";

const Topnavbar = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    try {
      await logoutUser();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-[100px] fixed z-50">
      <div className=" flex items-center justify-between h-[50px] px-10  bg-green-500">
        <div className="text-white  text-lg">MSM</div>
        <div className="flex gap-x-5 items-center">
          <div
            onClick={() => setOpen(true)}
            className="w-fit px-5 gap-x-2 h-[30px] rounded bg-white flex items-center justify-center cursor-pointer"
          >
            <LaptopOutlined /> Shortcut
          </div>
          <div
            onClick={handleClick}
            className="w-fit px-2  gap-x-2 text-red-500 h-[30px] rounded-full bg-white flex items-center justify-center cursor-pointer"
          >
            <LogoutOutlined /> logout
          </div>
        </div>
      </div>
      <div className="h-[50px] bg-[#f1f3f5]  flex justify-center">
        <Menu
          className=" w-[90%] bg-[#f1f3f5]"
          onClick={(e) => {
            router.push(e.key);
          }}
          defaultSelectedKeys={path}
          defaultOpenKeys={["sub1"]}
          mode="horizontal"
          theme="light"
          // inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <Modal
        footer={false}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div className="p-5 flex flex-col gap-y-4">
          <span>
             <kbd>Shift</kbd>+<kbd>D</kbd> &nbsp;<Tag color="green-inverse">Dashboard</Tag>
          </span>
          <span>
             <kbd>Shift</kbd>+<kbd>V</kbd> &nbsp;<Tag color="green-inverse">Vendors/Customers</Tag>
          </span>
          <span>
             <kbd>Shift</kbd>+<kbd>Z</kbd> &nbsp;<Tag color="green-inverse">Products/Services</Tag>
          </span>
          <span>
             <kbd>Shift</kbd>+<kbd>S</kbd> &nbsp;<Tag color="green-inverse">Sales Invoice</Tag>
          </span>
          <span>
             <kbd>Shift</kbd>+<kbd>P</kbd> &nbsp;<Tag color="green-inverse">Purchase Invoice</Tag>
          </span>
          <span>
             <kbd>Shift</kbd>+<kbd>C</kbd> &nbsp;<Tag color="green-inverse">Constant</Tag>
          </span>
          <span>
             <kbd>Shift</kbd>+<kbd>X</kbd> &nbsp;&nbsp;<Tag color="green-inverse">Settings</Tag>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default Topnavbar;

import React from "react";
import { KeyOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, Menu, Space, Tag, notification } from "antd";
import { logoutUser } from "../helper/apiHelper";
import {get} from 'lodash'

const Topnavbar = () => {
  const router = useRouter();
  const handleLOgout = async () => {
    try {
      const result = await logoutUser();
      notification.success({ message: get(result,"data.message","") });
      router.push("/");
    } catch (err) {
      notification.error({ message: get(err,"response.message","") });
    }
  };

  const items = [
    {
      key: "1",
      label: <div>My Profile</div>,
    },

    {
      key: "4",
      danger: true,
      label: <div onClick={handleLOgout}>Logout</div>,
    },
  ];
  return (
    <div className="h-[70px] flex items-center  justify-end w-[100%] px-10 gap-x-4 ">
      <Dropdown
        menu={{
          items,
        }}
        className="!cursor-pointer"
        placement="bottomRight"
      >
        <Avatar shape="square" className="!bg-[#6fd943]">
          M
        </Avatar>
      </Dropdown>
      <Avatar
        shape="square"
        className="text-lg bg-white cursor-pointer !shadow-2xl"
      >
        <KeyOutlined className="text-[#6fd943]" />
      </Avatar>
    </div>
  );
};

export default Topnavbar;

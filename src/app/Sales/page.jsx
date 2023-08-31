"use client";
import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { get } from "lodash";
import { createSaless, createVendors, getAllSaless, getAllVendors } from "../helper/apiHelper";

const Sales = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [form] = Form.useForm();

 

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-y-1 justify-center items-center">
      <div className="flex justify-start items-center w-[96%] h-[70px] px-4 rounded-lg">
        <Tag
          color="green"
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center cursor-pointer"
        >
          <PlusOutlined />
          <span>Add Sales</span>
        </Tag>
      </div>
      {/* <div className="flex justify-between px-10 w-[100%] h-[80%]">
        <Table
          key={1}
          rowSelection
          pagination={{ size: "small" }}
          className="w-[100%]"
          dataSource={vendorsData}
          columns={columns}
        />
      </div> */}
      <Drawer
        open={open}
        destroyOnClose
        width={1200}
        // footer={false}
        title="Add New Sales Bill"
        placement="right"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap w-[100%] gap-x-10 justify-center mt-1"
          layout="vertical"
          form={form}
        //   onFinish={handleFinish}
        >
          <Form.Item
            rules={[{ required: true, message: "Enter Bill Date" }]}
            name="Sales_name"
            label={<span className="font-bold text-black">Bill Date</span>}
          >
            <Input
              className="w-[200px] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Sales Name"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Enter Bill Date" }]}
            name="Sales_name"
            label={<span className="font-bold text-black">Vendor Name</span>}
          >
            <Input
              className="w-[200px] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Sales Name"
            />
          </Form.Item>
         
          <Form.Item className="w-[100%]">
            <Button
              htmlType="submit"
              className="!h-[50px] !w-fit bg-green-500 text-white hover:!text-white !border-green-500 !font-bold !text-lg capitalize !tracking-wide"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Sales;

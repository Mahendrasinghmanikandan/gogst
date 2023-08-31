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
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { get } from "lodash";
import { createVendors, getAllVendors } from "../helper/apiHelper";

const Vendors = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const result = await createVendors(values);
      notification.success({ message: get(result, "data.message", "") });
      form.resetFields();
      setLoading(false);
      setOpen(false);
      fetchData();
    } catch (err) {
      setLoading(false);
      notification.error({ message: get(err, "response.data.message", "") });
    }
  };

  const fetchData = async () => {
    try {
      const result = await getAllVendors();
      setVendorsData(get(result, "data.data", []));
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "vendor_name",
      key: "Name",
    },
    {
      title: "Email",
      dataIndex: "vendor_email",
      key: "vendor_email",
    },
    {
      title: "Address",
      dataIndex: "vendor_address",
      key: "vendor_address",
    },
    {
      title: "Contact",
      dataIndex: "vendor_contact",
      key: "vendor_contact",
    },
    {
      title: "GSTIN",
      dataIndex: "vendor_gst_number",
      key: "vendor_gst_number",
    },
    {
      title: "Action",
      align:"center",
      fixed:"right",
      render: () => {
        return (
          <div className="flex justify-evenly">
            <EditOutlined className="text-green-500" />
            <DeleteOutlined className="text-red-500" />
          </div>
        );
      },
    },
  ];

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
          <span>Add Vendor</span>
        </Tag>
      </div>
      <div className="flex justify-between px-10 w-[100%] h-[80%]">
        <Table
          key={1}
          rowSelection
          pagination={{ size: "small" }}
          className="w-[100%]"
          dataSource={vendorsData}
          columns={columns}
        />
      </div>
      <Modal
        open={open}
        destroyOnClose
        width={500}
        footer={false}
        title="Create New Vendor"
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap w-[100%] gap-x-10 justify-center mt-10"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            rules={[{ required: true, message: "Enter Vendor Name" }]}
            name="vendor_name"
            label={<span className="font-bold text-black">Name</span>}
          >
            <Input
              className="w-[30vw] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Name"
            />
          </Form.Item>
          <Form.Item
            name="vendor_contact"
            rules={[{ required: true, message: "Enter Vendor Contact" }]}
            label={<span className="font-bold text-black">Contact</span>}
          >
            <Input
              className="w-[30vw] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Contact"
            />
          </Form.Item>
          <Form.Item
            name="vendor_email"
            rules={[
              { required: true, message: "Enter Vendor Contact" },
              { type: "email", message: "Enter Valid Email" },
            ]}
            label={<span className="font-bold text-black">Email</span>}
          >
            <Input
              className="w-[30vw] h-[50px]  border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item
            name="vendor_address"
            rules={[{ required: true, message: "Enter Vendor Address" }]}
            label={<span className="font-bold text-black">Address</span>}
          >
            <Input.TextArea
              className="w-[30vw] h-[50px]  border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Address"
            />
          </Form.Item>
          <Form.Item
            name="vendor_gst_number"
            rules={[
              { required: true, message: "Enter GSTIN Number" },
              { max: 15, message: "Enter Valid GSTIN Number" },
              { min: 15, message: "Enter Valid GSTIN Number" },
            ]}
            label={<span className="font-bold text-black">GSTIN Number</span>}
          >
            <Input
              className="w-[30vw] h-[50px]  border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter GST Number"
            />
          </Form.Item>
          <Form.Item className="w-[100%]">
            <Button
              loading={loading}
              htmlType="submit"
              className="!h-[50px] !w-[100%] bg-green-500 text-white hover:!text-white !border-green-500 !font-bold !text-lg capitalize !tracking-wide"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vendors;

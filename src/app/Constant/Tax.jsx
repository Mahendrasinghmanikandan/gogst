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
import {
  createProducts,
  createTax,
  createVendors,
  getAllProducts,
  getAllTax,
  getAllVendors,
} from "../helper/apiHelper";

const Tax = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const result = await createTax(values);
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
      const result = await getAllTax();
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
      title: "S.No.",
      width:100,
      align:"center",
      dataIndex: "tax_name",
      key: "Name",
      render: (data, values, index) => {
        return index + 1;
      },
    },
    {
      title: "TAX Type Name",
      dataIndex: "tax_name",
      key: "Name",
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      width:100,
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
          <span>Add Tax</span>
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
        title="Add New Tax"
        placement="right"
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap w-[100%] gap-x-10 justify-center mt-1"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            rules={[{ required: true, message: "Enter Tax Name" }]}
            name="tax_name"
            label={<span className="font-bold text-black">Tax Name</span>}
          >
            <Input
              className="w-[30vw] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Tax Name"
            />
          </Form.Item>

          <Form.Item className="w-[100%]">
            <Button
              htmlType="submit"
              className="!h-[50px] !w-[100%] bg-green-500 text-white hover:!text-white !border-green-500 !font-bold !text-lg capitalize !tracking-wide"
            >
              Add Tax
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tax;

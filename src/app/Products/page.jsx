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
import { createProducts, createVendors, getAllProducts, getAllVendors } from "../helper/apiHelper";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const result = await createProducts(values);
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
      const result = await getAllProducts();
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
      dataIndex: "product_name",
      key: "Name",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
    },
    {
      title: "TAX Type",
      dataIndex: "product_tax_type",
      key: "vendor_gst_number",
    },
    {
      title: "Unit",
      dataIndex: "product_unit",
      key: "vendor_gst_number",
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
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
          <span>Add Product</span>
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
      <Drawer
        open={open}
        destroyOnClose
        width={500}
        // footer={false}
        title="Add New Product"
        placement="right"
        onClose={() => {
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
            rules={[{ required: true, message: "Enter Product Name" }]}
            name="product_name"
            label={<span className="font-bold text-black">Product Name</span>}
          >
            <Input
              className="w-[30vw] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Product Name"
            />
          </Form.Item>
          <Form.Item
            name="product_description"
            rules={[{ required: true, message: "Enter Product Description" }]}
            label={<span className="font-bold text-black">Product Description</span>}
          >
            <Input.TextArea
              className="w-[30vw] h-[50px] border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Product Description"
            />
          </Form.Item>
          <Form.Item
            name="product_price"
            rules={[
              { required: true, message: "Enter Product Price" },
             
            ]}
            label={<span className="font-bold text-black">Product Price</span>}
          >
            <Input
            type="Number"
              className="w-[30vw] h-[50px]  border-2 border-gray-300 hover:!border-green-500 focus:!border-green-500 !shadow-inner"
              placeholder="Enter Product Price"
            />
          </Form.Item>
          <Form.Item
            name="product_category"
            rules={[{ required: true, message: "Select Product Category" }]}
            label={<span className="font-bold text-black">Product Category</span>}
          >
            <Select placeholder="Select product category" className="!w-[30vw] !h-[50px]   hover:!border-green-500 focus:!border-green-500 !shadow-inner">
              <Select.Option value="Accessories">Accessories</Select.Option>
              <Select.Option value="Clothing">Clothing</Select.Option>
              <Select.Option value="Parts">Parts</Select.Option>
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Fashion">Fashion</Select.Option>
              <Select.Option value="Books">Books</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="product_tax_type"
            rules={[{ required: true, message: "Select Product TAX type" }]}
            label={<span className="font-bold text-black">Product TAX Type</span>}
          >
            <Select placeholder="Select product TAX Type" className="!w-[30vw] !h-[50px]   hover:!border-green-500 focus:!border-green-500 !shadow-inner">
              <Select.Option value="CGST">CGST</Select.Option>
              <Select.Option value="SGST">SGST</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="product_unit"
            rules={[{ required: true, message: "Select Product unit" }]}
            label={<span className="font-bold text-black">Product Unit</span>}
          >
            <Select  placeholder="Select product Unit" className="!w-[30vw] !h-[50px]   hover:!border-green-500 focus:!border-green-500 !shadow-inner">
              <Select.Option value="INCH">INCH</Select.Option>
              <Select.Option value="PC">PC</Select.Option>
              <Select.Option value="PIECES">PIECES</Select.Option>
              <Select.Option value="SET">SET</Select.Option>
              <Select.Option value="MASS">MASS</Select.Option>
              <Select.Option value="KG">KG</Select.Option>
            </Select>
          </Form.Item>
         
          <Form.Item className="w-[100%]">
            <Button
              htmlType="submit"
              className="!h-[50px] !w-[100%] bg-green-500 text-white hover:!text-white !border-green-500 !font-bold !text-lg capitalize !tracking-wide"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Product;

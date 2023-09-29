"use client";
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Divider,
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
  createVendors,
  getAllProducts,
  getAllVendors,
} from "../helper/apiHelper";

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
      title: "Stock",
      dataIndex: "product_stock",
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
    <div className="w-[100%] h-[100%] flex flex-col gap-y-1 justify-center items-center pt-[120px]">
      <div className="w-[90%]  flex flex-col gap-y-5">
        <div className="flex items-center justify-between bg-white p-4 shadow-lg rounded">
          <div className="flex flex-col  w-full">
            <div className="flex justify-between w-ful items-centerl">
              <h1>Product / Services</h1>
              <div className="flex gap-x-2">
                {/* <Tag
                icon={<FileExcelOutlined />}
                className="items-center flex cursor-pointer"
              >
                Import
              </Tag> */}

                {/* <Input placeholder="Search" allowClear /> */}
                <Tag
                  icon={<PlusOutlined />}
                  className="items-center flex cursor-pointer"
                  color="green"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add New
                </Tag>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div className="bg-white shadow-lg p-4 rounded">
          <Table
            key={1}
            rowSelection
            pagination={{ size: "small" }}
            className="w-[100%]"
            dataSource={vendorsData}
            columns={columns}
          />
        </div>
      </div>
      <Drawer
        open={open}
        destroyOnClose
        width={500}
        className="!relative"
        title="Add New Product"
        placement="bottom"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Form
          className="form_rover"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            rules={[{ required: true, message: "Enter Product Name" }]}
            name="product_name"
            label={<span className="font-bold text-black">Product Name</span>}
          >
            <Input className="my_input_box" placeholder="Enter Product Name" />
          </Form.Item>
          <Form.Item
            name="product_description"
            rules={[{ required: true, message: "Enter Product Description" }]}
            label={
              <span className="font-bold text-black">Product Description</span>
            }
          >
            <Input.TextArea
              className="my_input_box"
              placeholder="Enter Product Description"
            />
          </Form.Item>
          <Form.Item
            name="product_price"
            rules={[{ required: true, message: "Enter Product Price" }]}
            label={<span className="font-bold text-black">Product Price</span>}
          >
            <Input
              type="Number"
              className="my_input_box"
              placeholder="Enter Product Price"
            />
          </Form.Item>
          <Form.Item
            name="product_category"
            rules={[{ required: true, message: "Select Product Category" }]}
            label={
              <span className="font-bold text-black">Product Category</span>
            }
          >
            <Select
              placeholder="Select product category"
              className="my_select_box"
            >
              <Select.Option value="Accessories">Accessories</Select.Option>
              <Select.Option value="Clothing">Clothing</Select.Option>
              <Select.Option value="Parts">Parts</Select.Option>
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Fashion">Fashion</Select.Option>
              <Select.Option value="Books">Books</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="product_stock"
            rules={[{ required: true, message: "Enter Product Stock" }]}
            label={<span className="font-bold text-black">Product Stock</span>}
          >
            <Input
              type="Number"
              className="my_input_box"
              placeholder="Enter Product Stock"
            />
          </Form.Item>
          <Form.Item
            name="product_tax_type"
            rules={[{ required: true, message: "Select Product TAX type" }]}
            label={
              <span className="font-bold text-black">Product TAX Type</span>
            }
          >
            <Select
              placeholder="Select product TAX Type"
              className="my_select_box"
            >
              <Select.Option value="CGST">CGST</Select.Option>
              <Select.Option value="SGST">SGST</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="product_unit"
            rules={[{ required: true, message: "Select Product unit" }]}
            label={<span className="font-bold text-black">Product Unit</span>}
          >
            <Select placeholder="Select product Unit" className="my_select_box">
              <Select.Option value="INCH">INCH</Select.Option>
              <Select.Option value="PC">PC</Select.Option>
              <Select.Option value="PIECES">PIECES</Select.Option>
              <Select.Option value="SET">SET</Select.Option>
              <Select.Option value="MASS">MASS</Select.Option>
              <Select.Option value="KG">KG</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="drawer_button">
            <Button htmlType="submit" className="primary_button">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Product;

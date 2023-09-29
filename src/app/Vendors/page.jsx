"use client";
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import _, { get } from "lodash";
import {
  createVendors,
  deleteVendor,
  getAllVendors,
} from "../helper/apiHelper";

const Vendors = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [updateData, setUpdateData] = useState("");
  const [id, setId] = useState([]);
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
      setLoading(true);
      setId([]);
      const result = await getAllVendors();
      setVendorsData(get(result, "data.data", []));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notification.error({ message: "Something went wrong" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (value) => {
    try {
      setLoading(true);
      let ids = "";
      if (value === 15) {
        ids = _.isEmpty(id)
          ? JSON.stringify({ id: _.get(value, "_id", "") })
          : JSON.stringify({ id: id, from: "multiple" });
      } else {
        ids = JSON.stringify({ id: _.get(value, "_id", "") });
      }
      await deleteVendor(ids);
      setId([]);
      fetchData();
      setLoading(false);
      notification.success({ message: "Vendor Successfully Deleted" });
    } catch (err) {
      setLoading(false);
      notification.error({ message: "Something Went Wrong" });
    }
  };

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
      align: "center",
      fixed: "right",
      render: (values) => {
        return (
          <div className="flex justify-evenly">
            <EditOutlined
              onClick={() => {
                setUpdateData(_.get(values, "_id", ""));
                form.setFieldsValue(values);
                setId([]);
                setOpen(true);
              }}
              className="text-green-500 cursor-pointer hover:shadow-inner hover:white p-1 rounded-full"
            />
            <DeleteOutlined
              onClick={() => {
                handleDelete(values);
                setId([]);
              }}
              className="text-red-500 cursor-pointer hover:shadow-inner hover:white p-1 rounded-full"
            />
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
              <h1>Customer / Vendor</h1>
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
                  className="items-center flex cursor-pointer "
                  color="green"
                  onClick={() => {
                    setOpen(true);
                    setId([]);
                  }}
                >
                  Add New
                </Tag>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div className="bg-white shadow-lg p-4 rounded relative">
          <Table
            rowKey={(value) => value._id}
            pagination={{ size: "small", position: ["topRight"], pageSize: 5 }}
            className="w-[100%]"
            dataSource={vendorsData}
            columns={columns}
            loading={loading}
            rowSelection={{
              selectedRowKeys: id,
              onChange: (selectedRowKeys, selectedRows) => {
                setId(
                  selectedRows.map((res) => {
                    return res._id;
                  })
                );
              },
            }}
          />
          {!_.isEmpty(id) ? (
            <Tag
              icon={<DeleteOutlined />}
              className="items-center flex cursor-pointer animate-pulse absolute top-10 z-50"
              color="red"
              aria-disabled
              onClick={() => {
                handleDelete(15);
              }}
            >
              Delete
            </Tag>
          ) : (
            ""
          )}
        </div>
      </div>
      <Drawer
        open={open}
        destroyOnClose
        height={500}
        footer={false}
        title={`${updateData !=="" ? "Update" : "Add New"} Vendor`}
        className="!relative"
        placement="bottom"
        onClose={() => {
          setOpen(false);
          setUpdateData("");
          form.resetFields();
        }}
      >
        <Form
          className="form_rover"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            rules={[{ required: true, message: "Enter Vendor Name" }]}
            name="vendor_name"
            label={<span className="font-bold text-black">Name</span>}
          >
            <Input className="my_input_box" placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="vendor_contact"
            rules={[{ required: true, message: "Enter Vendor Contact" }]}
            label={<span className="font-bold text-black">Contact</span>}
          >
            <Input
              type="Number"
              maxLength={10}
              minLength={10}
              className="my_input_box"
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
            <Input className="my_input_box" placeholder="Enter Email" />
          </Form.Item>
          <Form.Item
            name="vendor_address"
            rules={[{ required: true, message: "Enter Vendor Address" }]}
            label={<span className="font-bold text-black">Address</span>}
          >
            <Input.TextArea
              className="my_input_box"
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
            <Input className="my_input_box" placeholder="Enter GST Number" />
          </Form.Item>
          <Form.Item className="drawer_button">
            <Button
              loading={loading}
              htmlType="submit"
              className="primary_button"
            >
             
              {updateData !=="" ? "Update" : "Add "} 
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Vendors;

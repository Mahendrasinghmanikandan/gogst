"use client";
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  SearchOutlined,
  EyeOutlined,
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
  deletePurchaseBill,
  deleteSalesBill,
  gellAllPurchaseBill,
  gellAllSalesBill,
  getAllProducts,
  getAllVendors,
} from "../helper/apiHelper";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import _ from "lodash";
import SalesBillView from "./SalesBillView";

const Purchase = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();

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
      setLoading(true);
      const result = await gellAllPurchaseBill();
      setSalesData(get(result, "data.data", []));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notification.error({ message: "Something went wrong" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deletePurchaseBill({ id: id });
      notification.success({message:"Deleted Successfully"});
      setLoading(false);
      fetchData();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoice_number",
      key: "Name",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
      key: "product_description",
      render: (_, value) => {
        return <h1>{moment(value).format("DD-MM-YYYY")}</h1>;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "Name",
    },
    {
      title: "Product Name",
      dataIndex: "items",
      key: "product_description",
      render: (value) => {
        return (
          <div className="flex flex-col gap-y-2 w-fit items-start justify-center">
            {value.map((res) => {
              return <h1 className="capitalize">{res.product}</h1>;
            })}
          </div>
        );
      },
    },
    {
      title: "Products price",
      dataIndex: "items",
      key: "product_description",
      render: (value) => {
        return (
          <div className="flex flex-col gap-y-2">
            {value?.map((res, index) => {
              return (
                <div key={index} className="gap-x-2 flex items-center">
                  <Tag color="orange">{res.quantity}</Tag>*
                  <Tag color="green"> &#8377; {res.price}</Tag>=
                  <Tag color="green"> &#8377; {res.total_price}</Tag>
                </div>
              );
            })}
          </div>
        );
      },
    },

    {
      title: "Total Price",
      dataIndex: "items",
      key: "product_description",
      render: (value) => {
        return (
          <div className="flex flex-wrap">
            &#8377;{" "}
            {_.sum(
              value.map((res) => {
                return res.total_price;
              })
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      render: (value) => {
        return (
          <div className="flex justify-evenly">
            <EyeOutlined
              onClick={() => {
                setOpen(true), setCurrentData(value);
              }}
              className="text-orange-500 p-2 bg-white hover:shadow-inner cursor-pointer"
            />
            <EditOutlined className="text-green-500 p-2 bg-white hover:shadow-inner" />
            <DeleteOutlined
              onClick={() => {
                handleDelete(value._id);
              }}
              className="text-red-500 p-2 bg-white hover:shadow-inner cursor-pointer"
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
              <h1>Purchase Invoice</h1>
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
                    router.push("/Sales/bill");
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
            dataSource={salesData}
            columns={columns}
            loading={loading}
          />
        </div>
      </div>
      <Drawer
        open={open}
        headerStyle={{ display: "none" }}
        destroyOnClose
        width={800}
        className="!relative"
        title="Add New Product"
        placement="left"
        onClose={() => {
          setOpen(false);
        }}
      >
        <SalesBillView currentData={currentData} />
      </Drawer>
    </div>
  );
};

export default Purchase;

"use client";
import {
  LeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, DatePicker, Form, Input, Select, notification } from "antd";
import { createSalesBill, getAllProducts, getAllVendors } from "@/app/helper/apiHelper";
import _ from "lodash";
import dayjs from "dayjs";
import moment from "moment";

const SalesBill = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [productData, setProductdata] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [date, setDate] = useState(new Date());

  const fetchdata = async () => {
    try {
      const result = await getAllProducts();
      const vendors = await getAllVendors();
      setProductdata(_.get(result, "data.data", []));
      setCustomerData(_.get(vendors, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleProductChange = (key, e) => {
    const data = form.getFieldValue("items");
    let price = productData.filter((res) => {
      return res.product_name === e;
    })[0].product_price;

    const newList = data.map((res) => {
      return res.id === key
        ? {
            ...res,
            ["price"]: price,
            ["total_price"]: price * Number(res.quantity),
          }
        : res;
    });

    form.setFieldValue("items", newList);
  };

  const handleQuntityChange = (key, e) => {
    const data = form.getFieldValue("items");
    const newList = data.map((res) => {
      return res.id === key
        ? { ...res, ["total_price"]: res.price * Number(res.quantity) }
        : res;
    });

    form.setFieldValue("items", newList);
  };

  const handleFinish = async (value) =>{
    try{
      value.invoice_date = date;
      if(_.isEmpty(value.items)){
        return notification.error({message:"Please add some products!"})
      }
      notification.success({message:"Bill Successfully Created"})
     await  createSalesBill(value);
     router.back();
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="w-screen min-h-screen flex flex-col gap-y-2">
       <div className="px-5  h-[80px] flex pt-2">
       <div className="bg-white p-5 w-full rounded-2xl shadow-2xl flex items-center justify-start font-bold text-green-500 gap-x-2">
       <LeftOutlined  onClick={() => {
          router.back();
        }} /> Create Sales Bill
       </div>
       </div>
      <div className="flex px-5 min-h-[calc(100vh-100px)]">
        <div className="bg-white rounded-2xl shadow-2xl w-[100%] h-[100%] p-5 flex flex-wrap justify-start items-start">
          <Form
            className="form_rover"
            layout="vertical"
            form={form}
            onFinish={handleFinish}
          >
            <div className="w-screen font-bold uppercase text-green-500 text-md mb-2 justify-between  flex">
              <h1 className="font-bold text-green-500 uppercase">
              
                General Details
              </h1>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="primary_button !bg-orange-500 !text-white !border-orange-500"
              >
                <span>Save Bill</span>
              </Button>
            </div>
            <Form.Item
              rules={[{ required: true, message: "Enter Invoice Number" }]}
              name="invoice_number"
              initialValue={1}
              label={<span className="form_label">Invoice Number</span>}
            >
              <Input
                placeholder="Enter Invoice Number"
                className="my_input_box"
              />
            </Form.Item>
            <Form.Item
              name="invoice_date"
              label={<span className="form_label">Invoice Date</span>}
            >
              <DatePicker
                onChange={(e) => {
                  setDate(e);
                }}
                value={dayjs(moment(date).format("DD-MM-YYYY"), "DD-MM-YYYY")}
                defaultValue={dayjs(
                  moment(date).format("DD-MM-YYYY"),
                  "DD-MM-YYYY"
                )}
                format={"DD-MM-YYYY"}
                className="my_input_box"
              />
            </Form.Item>
            <Form.Item
              name="customer_name"
              label={<span className="form_label">Customer Name</span>}
              initialValue={_.get(customerData, "[0].vendor_name", "")}
            >
              <Select
                showSearch
                placeholder="select Product Name"
                filterOption={(input, option) =>
                  (option?.value ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="my_select_box"
                
              >
                {customerData &&
                  _.uniqBy(customerData, (res) => res.vendor_name).map(
                    (res, index) => {
                      return (
                        <Option value={res.vendor_name} key={index}>
                          {res.vendor_name}
                        </Option>
                      );
                    }
                  )}
              </Select>
            </Form.Item>
            <div className="w-screen flex  flex-col">
              <Form.List name="items">
                {(fields, { add, remove }) => (
                  <>
                    <div className="w-[100%] flex justify-between">
                      <h1 className="font-bold text-green-500 uppercase">
                        Product Details
                      </h1>

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          className="!flex !w-fit !items-center !justify-center hover:!border-primary hover:!text-primary"
                        >
                          <PlusOutlined className="text-green-500" />
                       
                        </Button>
                      </Form.Item>
                    </div>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        className="flex gap-x-10 items-center justify-start w-[100%]"
                        key={key}
                      >
                        <Form.Item
                          label={
                            <span className="form_label">{`Product ${
                              index + 1
                            }`}</span>
                          }
                          {...restField}
                          name={[name, `product`]}
                          rules={[
                            {
                              required: true,
                              message: "Enter product name",
                            },
                          ]}
                          initialValue={_.get(
                            productData,
                            "[0].product_name",
                            ""
                          )}
                        >
                          <Select
                            showSearch
                            placeholder="select Product Name"
                            filterOption={(input, option) =>
                              (option?.value ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            className="my_select_box"
                            onChange={(e) => {
                              handleProductChange(key, e);
                            }}
                          >
                            {productData &&
                              productData.map((res, index) => {
                                return (
                                  <Option value={res.product_name} key={index}>
                                    {res.product_name}
                                  </Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="form_label">{`Product id ${
                              index + 1
                            }`}</span>
                          }
                          {...restField}
                          name={[name, `id`]}
                          rules={[
                            {
                              required: true,
                              message: "Enter product quantity",
                            },
                          ]}
                          initialValue={key}
                          onChange={(value) => {
                            handleQuntityChange(key, value);
                          }}
                          className="!hidden"
                        >
                          <Input
                            className="my_input_box !w-[200px] hidden"
                            type="Number"
                            placeholder="Enter Quantity"
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span className="form_label">{`Product Price ${
                              index + 1
                            }`}</span>
                          }
                          {...restField}
                          name={[name, `price`]}
                          rules={[
                            {
                              required: true,
                              message: "Enter product price",
                            },
                          ]}
                          initialValue={_.get(
                            productData,
                            "[0].product_price",
                            ""
                          )}
                        >
                          <Input
                            className="my_input_box !w-[200px]"
                            type="Number"
                            placeholder="Enter Price"
                          />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="form_label">{`Product Quantity ${
                              index + 1
                            }`}</span>
                          }
                          {...restField}
                          name={[name, `quantity`]}
                          rules={[
                            {
                              required: true,
                              message: "Enter product quantity",
                            },
                          ]}
                          initialValue={1}
                          onChange={(value) => {
                            handleQuntityChange(key, value);
                          }}
                        >
                          <Input
                            className="my_input_box !w-[200px]"
                            type="Number"
                            placeholder="Enter Quantity"
                          />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span className="form_label">{`Total Price ${
                              index + 1
                            }`}</span>
                          }
                          {...restField}
                          name={[name, `total_price`]}
                          rules={[
                            {
                              required: true,
                              message: "Enter product total price",
                            },
                          ]}
                          initialValue={_.get(
                            productData,
                            "[0].product_price",
                            ""
                          )}
                        >
                          <Input
                            className="my_input_box !w-[200px]"
                            type="Number"
                            placeholder="Enter total price"
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      </div>
                    ))}
                    <div className="flex justify-between"></div>
                  </>
                )}
              </Form.List>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SalesBill;

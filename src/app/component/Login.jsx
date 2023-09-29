import { Button, Form, Input, notification } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { PlaySquareOutlined } from "@ant-design/icons";
import { createOrLoginUser } from "../helper/apiHelper";
import { get } from "lodash";

const Login = ({ currentCom, setCurrentCom }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleGuestClick = () => {
    form.setFieldsValue({ email: "demo@gmail.com", password: "DemoUser" });
  };

  const handleFinish = async (values) => {
    try {
      setLoadingBtn(true);
      const result = await createOrLoginUser(values);
      notification.success({ message: get(result, "data.message", "") });
      router.push("/Dashboard");
      setLoadingBtn(false);
    } catch (err) {
      setLoadingBtn(false);
      notification.error({ message: get(err, "response.data.message", "") });
    }
  };

  return (
    <div className="w-[100%] flex items-center justify-center">
      <Form
        layout="vertical"
        className="w-[400px] flex flex-col  gap-y-1"
        form={form}
        onFinish={handleFinish}
      >
        <h1 className="font-bold text-lg mb-8 tracking-wide text-center text-transparent bg-clip-text bg-gradient-to-l from-black to-green-500 !font-primary uppercase">
          Create or login to my account
        </h1>
        <Form.Item
          label={<span className="font-bold">Email</span>}
          name="email"
          rules={[
            {
              required: true,
              message: "Enter Email",
            },
            {
              type: "email",
              message: "Enter Valid Email",
            },
          ]}
        >
          <Input
            placeholder="Enter Email"
            className="!h-[50px] hover:!border-green-500 focus:!border-green-500 !shadow-inner"
          />
        </Form.Item>
        <Form.Item
          label={<span className="font-bold">Password</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "Enter Password",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            className="!h-[50px] hover:!border-green-500 focus:!border-green-500 !shadow-inner"
          />
        </Form.Item>
        <div className="flex justify-end mb-4">
          <h1 className="text-green-500  cursor-pointer">
            Forgot My Password?
          </h1>
        </div>
        <Form.Item>
          <Button
            loading={loadingBtn}
            htmlType="submit"
            className="!h-[50px] !w-[100%] !border-green-500 !text-green-500 !font-bold !text-lg capitalize !tracking-wide"
          >
            Login
          </Button>
        </Form.Item>

        <div className="flex gap-x-2 ">
          {/* <div className="!h-[50px] cursor-pointer rounded-lg group !w-[50%] !bg-slate-50 shadow-lg !border-none  !font-bold !text-lg flex items-center justify-center gap-x-2 !tracking-wide">
            <Image src="/assets/images/google.png" width={20} height={100} />
            <p className="!font-primary !font-bold text-sm group-hover:text-blue-500">
              Sign in With Google
            </p>
          </div> */}
          <div
            onClick={handleGuestClick}
            className="!h-[50px] !w-[100%] cursor-pointer rounded-lg !bg-slate-50 group shadow-lg !border-none  !font-bold !text-lg flex items-center justify-center gap-x-2 !tracking-wide"
          >
            <PlaySquareOutlined />
            <p className="!font-primary !font-bold text-sm group-hover:text-green-500">
              Sign up to be a guest
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;

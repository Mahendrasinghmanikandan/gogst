import { Card, Image } from "antd";
import React from "react";

const Brand = () => {
  return (
    <div className="flex w-[100%] justify-center">
      <Card
        className="!w-[98%]"
        title="Brand Settings"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <div className="flex flex-wrap gap-x-10">
          <Card
            className="!w-[28%]"
            title="Logo Light Theme"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Image width={200} src="/assets/images/logo.png" />

          </Card>
          <Card
            className="!w-[28%]"
            title="Logo Dark Theme"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Image width={200} src="https://www.scopikovelotechx.com/images/dashboard/logo.png" />

          </Card>
          <Card
            className="!w-[28%]"
            title="Favicon Logo"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Image width={200} src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Brand;

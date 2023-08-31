import { Card, Image, Tag } from "antd";
import React from "react";

const Themes = () => {
  return (
    <div className="flex w-[100%] justify-center">
      <Card
        className="!w-[98%]"
        title="Themes Settings"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <div className="flex flex-wrap gap-x-10">
          <Card
            className="!w-[28%]"
            title="Heading Text Color"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Tag color="red" >&nbsp;</Tag>
            <Tag color="red" >&nbsp;</Tag>
            <Tag color="red" >&nbsp;</Tag>
            <Tag color="red" >&nbsp;</Tag>
            <Tag color="red" >&nbsp;</Tag>
            <Tag color="red" >&nbsp;</Tag>
            <Tag color="red" >&nbsp;</Tag>
          </Card>
          <Card
            className="!w-[28%]"
            title="Sub Heading Color"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Image
              width={200}
              src="https://www.scopikovelotechx.com/images/dashboard/logo.png"
            />
          </Card>
          <Card
            className="!w-[28%]"
            title="Primary Color"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Image
              width={200}
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            />
          </Card>
          <Card
            className="!w-[28%]"
            title="Secondary Color"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Image
              width={200}
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Themes;

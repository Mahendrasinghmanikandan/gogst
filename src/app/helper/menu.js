import {
  BookOutlined,
  ContainerOutlined,
  UserSwitchOutlined,
  DollarOutlined,
  SettingOutlined,
  FileDoneOutlined,
  HomeOutlined,
  MailOutlined,
  AimOutlined
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const items = [
  getItem("Dashboard", "/Dashboard", <HomeOutlined />),
  getItem("Customer / Vendors", "/Vendors", <UserSwitchOutlined />),
  getItem("Products / Services", "/Products", <ContainerOutlined />),
  getItem("Sales Invoice", "/Sales", <DollarOutlined />),
  getItem("Purchase Invoice", "/Purchase", <FileDoneOutlined />),
  // getItem("All Reports", "/Report", <BookOutlined />),
  getItem("Constant", "/Constant", <AimOutlined />),
  getItem("Settings", "/Settings", <SettingOutlined />),
    // getItem("Constant", "sub1", <MailOutlined />, [
    //   getItem("TAX type", "5"),
    //   getItem("Category", "6"),
    //   getItem("unit", "7"),
    //   getItem("Option 8", "8"),
    // ]),
  //   getItem("Purchase", "sub2", <AppstoreOutlined />, [
  //     getItem("Option 9", "9"),
  //     getItem("Option 10", "10"),
  //     getItem("Submenu", "sub3", null, [
  //       getItem("Option 11", "11"),
  //       getItem("Option 12", "12"),
  //     ]),
  //   ]),
];

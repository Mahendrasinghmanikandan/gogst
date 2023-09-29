"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import Sidenavbar from "./component/Sidenavbar";
import Topnavbar from "./component/Topnavbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { tokenStatusChecking } from "./helper/apiHelper";
import { Skeleton, Spin } from "antd";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(async () => {
    try {
      setLoading(true);
      const result = await tokenStatusChecking();
      router.push("/Dashboard");
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleClicked = (key) => {
      if (key.shiftKey && key.key === "D") router.push("/Dashboard");
      if (key.shiftKey && key.key === "Z") router.push("/Products");
      if (key.shiftKey && key.key === "V") router.push("/Vendors");
      if (key.shiftKey && key.key === "P") router.push("/Purchase");
      if (key.shiftKey && key.key === "S") router.push("/Sales");
      if (key.shiftKey && key.key === "C") router.push("/Constant");
      if (key.shiftKey && key.key === "X") router.push("/Settings");
    };
    window.addEventListener("keyup", handleClicked);
    return () => {
      window.removeEventListener("keyup", handleClicked);
    };
  }, []);

  return (
    <html lang="en">
      <title>Billing Software</title>
      <body className={inter.className}>
        <Skeleton loading={loading} className="!w-screen !h-screen">
          <div className={`flex flex-col  w-screen`}>
            {!["/Sales/bill", "/", "/Purchase/bill"].includes(path) && (
              <Topnavbar />
            )}
            <div className="bg-[#f8f8f8] w-screen min-h-screen">{children}</div>
          </div>
        </Skeleton>
      </body>
    </html>
  );
}

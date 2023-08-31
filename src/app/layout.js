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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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

  return (
    <html lang="en">
      <title>Billing Software</title>
      <body className={inter.className}>
        <Skeleton loading={loading} className="!w-screen !h-screen">
          <div className="!flex !w-screen !h-screen !bg-gradient-to-r from-white to-[#f5f7f6]">
            <div className="w-[15vw]">{path !== "/" && <Sidenavbar />}</div>
            <div
              className={`flex flex-col ${
                path === "/" ? "w-screen" : "w-[85vw]"
              }`}
            >
              {path !== "/" && <Topnavbar />}
              <div>{children}</div>
            </div>
          </div>
        </Skeleton>
      </body>
    </html>
  );
}
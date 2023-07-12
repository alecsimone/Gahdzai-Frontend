import type { NextPage } from "next";
import Home from "@/components/Foundation/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gahdzai - Keep an eye out",
  description: "Keep an eye on the markets and your money",
};

const Page: NextPage = () => <Home />;

export default Page;

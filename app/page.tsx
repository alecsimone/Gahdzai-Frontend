import type { NextPage } from "next";
import Home from "@/components/Foundation/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gahdzai - Keep an eye on your markets",
  description: "Keep an eye on your markets",
};

const Page: NextPage = () => <Home />;

export default Page;

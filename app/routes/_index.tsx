import type { MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import About from "@/components/About";

export const meta: MetaFunction = () => {
  return [
    { title: "Weeeeeee" },
    { name: "description", content: "It's Alfredo " },
  ];
};

export default function Index() {
  return (
    <div className="">
      <Header className="mt-8" />
      <About />
    </div>
  );
}

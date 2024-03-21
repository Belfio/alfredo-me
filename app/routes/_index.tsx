import type { MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

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
      <Button>Click me</Button>
      <div className="bg-red-500">Ciao</div>
      <h1>Welcome to my pagea</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            Questo è il sito di Alfredo
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}

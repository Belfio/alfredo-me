import { type MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { useParams } from "@remix-run/react";
import Article from "@/components/Article";
import useMarkdown from "@/hooks/useMarkdown";
import { useEffect, useState } from "react";
import { Blog } from "@/components/Blogs";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function BlogPage() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const { getBlog } = useMarkdown();

  useEffect(() => {
    const blog = getBlog(blogId || "");

    setBlog(blog);
  }, [blogId, getBlog]);

  return (
    <div className="">
      <Header className="mt-8" />
      {blog && <Article html={blog?.html} />}
    </div>
  );
}

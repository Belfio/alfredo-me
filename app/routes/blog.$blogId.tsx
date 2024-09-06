import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { useLoaderData, useParams } from "@remix-run/react";

import Article from "@/components/Article";
import useMarkdown from "@/hooks/useMarkdown";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default async function BlogPage() {
  const { blogId } = useParams();
  const { getBlog } = useMarkdown();
  const blog = await getBlog(blogId || "");
  return (
    <div className="">
      <Header className="mt-8" />
      <Article html={blog?.html || ""} />
    </div>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { blogId } = params;
  if (!blogId) {
    return json({
      blog: { html: "Something went wrong :((", title: "", description: "" },
    });
  }
  const blog = await getBlog(blogId);
  return json({ blog });
};

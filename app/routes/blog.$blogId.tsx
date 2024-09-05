import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { useLoaderData } from "@remix-run/react";
import { getBlog } from "~/files.server";
import { Blog } from "@/components/Blogs";
import Article from "@/components/Article";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function BlogPage() {
  const { blog } = useLoaderData<typeof loader>() as { blog: Blog };
  return (
    <div className="">
      <Header className="mt-8" />
      <Article html={blog.html} />
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

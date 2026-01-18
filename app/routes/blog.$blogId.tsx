import { type MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError, useParams } from "@remix-run/react";
import Header from "@/components/Header";
import Article from "@/components/Article";
import useMarkdown from "@/hooks/useMarkdown";
import { useEffect, useState } from "react";
import { Blog } from "@/components/Blogs";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Alfredo's website" },
    { name: "description", content: "Blog post on Alfredo's personal website" },
  ];
};

export default function BlogPage() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { getBlog, blogs } = useMarkdown();

  useEffect(() => {
    if (blogs.length > 0) {
      const foundBlog = getBlog(blogId || "");
      setBlog(foundBlog);
      setLoading(false);
    }
  }, [blogId, getBlog, blogs]);

  if (loading) {
    return (
      <div className="">
        <Header className="mt-8" />
        <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="">
        <Header className="mt-8" />
        <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
          <h1>Blog post not found</h1>
          <p>The blog post you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Header className="mt-8" />
      <Article html={blog.html} />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Header className="mt-8" />
        <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <Header className="mt-8" />
        <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
          <h1>Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header className="mt-8" />
        <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
          <h1>Unknown Error</h1>
        </div>
      </div>
    );
  }
}

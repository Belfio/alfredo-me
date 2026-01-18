import { type MetaFunction, type LoaderFunctionArgs, json } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError, useLoaderData } from "@remix-run/react";
import Header from "@/components/Header";
import Article from "@/components/Article";
import { getBlog } from "@/lib/markdown.server";

const BASE_URL = "https://albelfio.com";

export async function loader({ params }: LoaderFunctionArgs) {
  const blog = await getBlog(params.blogId || "");

  if (!blog) {
    throw new Response("Blog post not found", { status: 404 });
  }

  return json({ blog });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.blog) {
    return [
      { title: "Blog Not Found | Alfredo's website" },
      { name: "description", content: "Blog post not found" },
    ];
  }

  const { blog } = data;
  const url = `${BASE_URL}/blog/${blog.id}`;

  return [
    { title: `${blog.title} | Alfredo's website` },
    { name: "description", content: blog.description },
    // Open Graph
    { property: "og:title", content: blog.title },
    { property: "og:description", content: blog.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    // Twitter Card
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: blog.title },
    { name: "twitter:description", content: blog.description },
    // Canonical
    { tagName: "link", rel: "canonical", href: url },
  ];
};

export default function BlogPage() {
  const { blog } = useLoaderData<typeof loader>();

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
          <h1>{error.status === 404 ? "Blog post not found" : `${error.status} ${error.statusText}`}</h1>
          <p>{error.status === 404 ? "The blog post you are looking for does not exist." : error.data}</p>
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

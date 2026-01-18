import { type MetaFunction, json } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError, useLoaderData } from "@remix-run/react";
import Header from "@/components/Header";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import { getBlogs, getProjects } from "@/lib/markdown.server";

const BASE_URL = "https://albelfio.com";

export async function loader() {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);
  return json({ blogs, projects });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Alfredo Belfio | Software Engineer" },
    { name: "description", content: "Personal website of Alfredo Belfio - Software Engineer, projects, and blog posts about technology and engineering." },
    // Open Graph
    { property: "og:title", content: "Alfredo Belfio | Software Engineer" },
    { property: "og:description", content: "Personal website of Alfredo Belfio - Software Engineer, projects, and blog posts about technology and engineering." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: BASE_URL },
    // Twitter Card
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Alfredo Belfio | Software Engineer" },
    { name: "twitter:description", content: "Personal website of Alfredo Belfio - Software Engineer, projects, and blog posts." },
    // Canonical
    { tagName: "link", rel: "canonical", href: BASE_URL },
  ];
};

export default function Index() {
  const { blogs, projects } = useLoaderData<typeof loader>();
  return (
    <div className="">
      <Header className="mt-8" />
      <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
        <About />
        <Projects projects={projects} />
        <Blogs blogs={blogs} />
        <Contact />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

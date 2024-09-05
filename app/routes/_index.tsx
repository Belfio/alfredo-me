import type { MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Header from "@/components/Header";
import About from "@/components/About";
import Projects, { Project } from "@/components/Projects";
import Blogs, { Blog } from "@/components/Blogs";
import { getBlogs, getProjects } from "~/files.server";
import Contact from "@/components/Contact";

export const meta: MetaFunction = () => {
  return [
    { title: "Alfredo's personal website" },
    { name: "description", content: "Alfredo's personal website" },
  ];
};

export default function Index() {
  const { projects, blogs } = useLoaderData<typeof loader>();

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

export async function loader() {
  const projects: Project[] = await getProjects();
  const blogs: Blog[] = await getBlogs();
  return {
    projects,
    blogs,
  };
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

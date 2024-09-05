import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "@/components/Header";
import About from "@/components/About";
import Projects, { Project } from "@/components/Projects";
import Blogs, { Blog } from "@/components/Blogs";
import { getBlogs, getProjects } from "~/files.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Alfredo's personal website" },
    { name: "description", content: "Alfredo's personal website" },
  ];
};

export default function Index() {
  const { projects, blogs } = useLoaderData<typeof loader>();
  console.log("BLOGS", blogs);
  console.log("PROJECTS", projects);
  return (
    <div className="">
      <Header className="mt-8" />
      <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
        <About />
        <Projects projects={projects} />
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
}

export async function loader() {
  const projects = await getProjects();
  const blogs = await getBlogs();
  return {
    projects,
    blogs,
  };
}

export function ErrorBoundary() {
  return <div>Error</div>;
}

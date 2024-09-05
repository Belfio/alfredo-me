import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { json, useLoaderData } from "@remix-run/react";
import { getProject } from "~/files.server";
import { Project } from "@/components/Projects";
import Article from "@/components/Article";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Projects() {
  const { project } = useLoaderData<typeof loader>() as { project: Project };
  return (
    <div className="">
      <Header className="mt-8" />
      <Article html={project.html} />
    </div>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { projectId } = params;
  if (!projectId) {
    return json({
      project: { html: "Something went wrong :((", name: "", description: "" },
    });
  }
  const project = await getProject(projectId);
  return json({ project });
};

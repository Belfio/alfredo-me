import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { json, useLoaderData, useParams } from "@remix-run/react";
import Article from "@/components/Article";
import useMarkdown from "@/hooks/useMarkdown";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default async function Projects() {
  const { projectId } = useParams();
  const { getProject } = useMarkdown();
  const project = await getProject(projectId || "");
  return (
    <div className="">
      <Header className="mt-8" />
      <Article html={project?.html || ""} />
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

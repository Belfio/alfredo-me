import type { MetaFunction } from "@remix-run/node";
import Header from "@/components/Header";
import { useParams } from "@remix-run/react";
import Article from "@/components/Article";
import useMarkdown from "@/hooks/useMarkdown";
import { Project } from "@/components/Projects";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Projects() {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const { projectId } = useParams();
  const { getProject } = useMarkdown();
  useEffect(() => {
    const project = getProject(projectId || "");
    setProject(project);
  }, [projectId, getProject]);
  return (
    <div className="">
      <Header className="mt-8" />
      {project && <Article html={project?.html} />}
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError, useParams } from "@remix-run/react";
import Header from "@/components/Header";
import Article from "@/components/Article";
import useMarkdown from "@/hooks/useMarkdown";
import { Project } from "@/components/Projects";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Project | Alfredo's website" },
    { name: "description", content: "Project on Alfredo's personal website" },
  ];
};

export default function ProjectPage() {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();
  const { getProject, projects } = useMarkdown();

  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = getProject(projectId || "");
      setProject(foundProject);
      setLoading(false);
    }
  }, [projectId, getProject, projects]);

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

  if (!project) {
    return (
      <div className="">
        <Header className="mt-8" />
        <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
          <h1>Project not found</h1>
          <p>The project you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Header className="mt-8" />
      <Article html={project.html} />
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

import { type MetaFunction, type LoaderFunctionArgs, json } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError, useLoaderData } from "@remix-run/react";
import Header from "@/components/Header";
import Article from "@/components/Article";
import { getProject } from "@/lib/markdown.server";

const BASE_URL = "https://albelfio.com";

export async function loader({ params }: LoaderFunctionArgs) {
  const project = await getProject(params.projectId || "");

  if (!project) {
    throw new Response("Project not found", { status: 404 });
  }

  return json({ project });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.project) {
    return [
      { title: "Project Not Found | Alfredo's website" },
      { name: "description", content: "Project not found" },
    ];
  }

  const { project } = data;
  const url = `${BASE_URL}/project/${project.id}`;

  return [
    { title: `${project.name} | Alfredo's website` },
    { name: "description", content: project.description },
    // Open Graph
    { property: "og:title", content: project.name },
    { property: "og:description", content: project.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    // Twitter Card
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: project.name },
    { name: "twitter:description", content: project.description },
    // Canonical
    { tagName: "link", rel: "canonical", href: url },
  ];
};

export default function ProjectPage() {
  const { project } = useLoaderData<typeof loader>();

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
          <h1>{error.status === 404 ? "Project not found" : `${error.status} ${error.statusText}`}</h1>
          <p>{error.status === 404 ? "The project you are looking for does not exist." : error.data}</p>
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

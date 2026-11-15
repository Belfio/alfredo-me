import { type MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import BioTimeline from "@/components/BioTimeline";
import Contact from "@/components/Contact";

const BASE_URL = "https://albelfio.com";

export const meta: MetaFunction = () => {
  const url = `${BASE_URL}/bio`;
  const title = "Bio | Alfredo Belfio";
  const description =
    "Three parallel lines — activities, places, and people — from 2026 back to 1988.";

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { tagName: "link", rel: "canonical", href: url },
  ];
};

export default function BioPage() {
  return (
    <main className="m-auto w-[95%] sm:max-w-[780px] py-10 px-4">
      <BioTimeline />
      <Contact />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="m-auto w-[95%] sm:max-w-[780px] py-10 px-4">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div className="m-auto w-[95%] sm:max-w-[780px] py-10 px-4">
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
}

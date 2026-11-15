import { type MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Header from "@/components/Header";
import BioTimeline from "@/components/BioTimeline";
import Contact from "@/components/Contact";

const BASE_URL = "https://albelfio.com";

export const meta: MetaFunction = () => {
  const url = `${BASE_URL}/bio`;
  const title = "Bio (1988–2026) | Alfredo Belfio";
  const description =
    "Thirty-eight years in six parallel vertical lines — 1 for activities and achievements, 2 for places, 3 for people, from 1988 to 2026.";

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
    <div>
      <Header className="mt-8" />
      <main className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
        <BioTimeline />
        <Contact />
      </main>
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
  }

  return (
    <div>
      <Header className="mt-8" />
      <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
        <h1>Error</h1>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    </div>
  );
}

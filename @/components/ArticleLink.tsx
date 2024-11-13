import { Link } from "@remix-run/react";

export default function ArticleLink({
  title,
  description,
  id,
  folder,
  createdAt,
}: {
  title: string;
  description: string;
  id: string;
  folder: "blog" | "project";
  createdAt: string;
}): JSX.Element {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  if (!description || !title || !id || !folder || !createdAt) {
    return <></>;
  }
  return (
    <div className="my-4" key={id}>
      <Link
        to={`/${folder}/${id}`}
        className="my-4 text-gray-900 visited:text-gray-900 hover:text-blue-500 link:text-gray-900"
      >
        <p className="text-xs text-gray-500 m-0">{formattedDate}</p>
        <h3 className="m-0">{title}</h3>
        <p className="m-0">{description}</p>
      </Link>
    </div>
  );
}

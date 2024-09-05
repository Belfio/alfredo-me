import { Link } from "@remix-run/react";

export default function ArticleLink({
  title,
  description,
  id,
  folder,
}: {
  title: string;
  description: string;
  id: string;
  folder: "blog" | "project";
}): JSX.Element {
  return (
    <div className="my-4" key={id}>
      <Link
        to={`/${folder}/${id}`}
        className="my-4 text-gray-900 visited:text-gray-900 hover:text-blue-500 link:text-gray-900"
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
}

import ArticleLink from "./ArticleLink";

export type Project = {
  name: string;
  description: string;
  id: string;
  html: string;
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <div id="projects" className="my-8 ">
      <h1>Projects</h1>
      {projects.map((project) => (
        <ArticleLink
          key={project.id}
          title={project.name}
          description={project.description}
          id={project.id}
          folder="project"
        />
      ))}
    </div>
  );
}

import ArticleLink from "./ArticleLink";

export type Project = {
  name: string;
  description: string;
  id: string;
  html: string;
  createdAt: string;
};

export default function Projects({ projects }: { projects: Project[] }) {
  const projectsSorted = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  console.log(projectsSorted);
  return (
    <div id="projects" className="my-8 ">
      <h1>New projects</h1>
      {projectsSorted.map((project) => (
        <ArticleLink
          key={project.id}
          title={project.name}
          description={project.description}
          id={project.id}
          folder="project"
          createdAt={project.createdAt}
        />
      ))}
    </div>
  );
}

export type Project = {
  name: string;
  description: string;
  id: string;
  html: string;
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <div id="projects" className=" ">
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project.name}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div dangerouslySetInnerHTML={{ __html: project.html }} />
        </div>
      ))}
    </div>
  );
}

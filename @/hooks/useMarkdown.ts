import { parse } from "marked";
import { Project } from "@/components/Projects";
import { Blog } from "@/components/Blogs";
import { useState, useEffect } from "react";

type Module = {
  default: string;
};

export default function useMarkdown(): {
  blogs: Blog[];
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  getBlog: (id: string) => Blog | undefined;
} {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setBlogs(await getBlogs());
      setProjects(await getProjects());
    };
    fetchData();
  }, []);

  function getProject(id: string): Project | undefined {
    const project = projects.find((project) => project.id === id);
    return project;
  }
  function getBlog(id: string): Blog | undefined {
    console.log("id", id);
    const blog = blogs.find((blog) => blog.id === id);
    return blog;
  }
  return {
    blogs,
    projects,
    getProject: (id) => getProject(id),
    getBlog: (id) => getBlog(id),
  };
}

async function getBlogs(): Promise<Blog[]> {
  const modules = import.meta.glob<Module>("@/blogs/*.md", {
    eager: true,
  });

  const fileNames: string[] = Object.values(modules).map(
    (module) => module.default
  );

  const files = await parseFiles(fileNames); // Await the promise here

  const blogs = await Promise.all(
    files.map(async (file, i) => {
      const { html, name, description, createdAt } = await parseMarkdown(file);
      return {
        title: name,
        description,
        // id: fileNames[i].split(".md")[0].replace(/[/@]/g, "_"),
        id: name.replace(/[^a-zA-Z0-9]/g, "") + i.toString(),
        html,
        createdAt,
      };
    })
  );

  console.log("blogs", blogs);

  return blogs;
}

async function getProjects(): Promise<Project[]> {
  const modules = import.meta.glob<Module>("@/projects/*.md", {
    eager: true,
  });
  const fileNames: string[] = Object.values(modules).map(
    (module) => module.default
  );

  const files = await parseFiles(fileNames); // Await the promise here
  const projects = (
    await Promise.all(
      files.map(async (file, i) => {
        const { html, name, description, createdAt } = await parseMarkdown(
          file
        );
        if (!name || !description || !createdAt) {
          return;
        }
        return {
          name: name,
          description,
          // id: fileNames[i].split(".md")[0].replace(/[/@]/g, "_"),
          id: name.replace(/[^a-zA-Z0-9]/g, "") + i.toString(),
          html,
          createdAt,
        };
      })
    )
  ).filter((project: Project | undefined): project is Project =>
    Boolean(project)
  );
  return projects;
}

async function parseFiles(fileNames: string[]): Promise<string[]> {
  const files = await Promise.all(
    fileNames.map(async (file: string) => {
      return fetch(file)
        .then((res) => res.text())
        .catch((err) => {
          console.log("err", err);
          return "";
        });
    })
  );

  return files;
}

async function parseMarkdown(content: string): Promise<{
  html: string;
  name: string;
  description: string;
  createdAt: string;
}> {
  try {
    const html = await parse(content);
    const name = content.split("# ")[1].split("\n")[0];
    // console.log("name", name);
    const description = content.split("# ")[2].split("\n")[0];
    const createdAt = getDateFromContent(content);
    return { html, name, description, createdAt };
  } catch {
    console.log("error", name);
    return { html: "", name: "", description: "", createdAt: "" };
  }
}

function getDateFromContent(content: string): string {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  let createdAt = "";
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (isValidDate(line)) {
      createdAt = line;
      break;
    }
  }
  return createdAt;
}

function isValidDate(dateString: string): boolean {
  // Regex to match YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

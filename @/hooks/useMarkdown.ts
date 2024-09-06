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
  getProject: (id: string) => Promise<Project | undefined>;
  getBlog: (id: string) => Promise<Blog | undefined>;
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

  async function getProject(id: string): Promise<Project | undefined> {
    const project = projects.find((project) => project.id === id);
    return project;
  }
  async function getBlog(id: string): Promise<Blog | undefined> {
    const blog = blogs.find((blog) => blog.id === id);
    return blog;
  }
  return { blogs, projects, getProject, getBlog };
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
    files.map(async (file) => {
      const { html, name, description } = await parseMarkdown(file);
      return {
        title: name,
        description,
        id: file,
        html,
      };
    })
  );

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
  const projects = await Promise.all(
    files.map(async (file) => {
      const { html, name, description } = await parseMarkdown(file);
      return {
        name: name,
        description,
        id: file,
        html,
      };
    })
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
}> {
  try {
    const html = await parse(content);
    const name = content.split("# ")[1].split("\n")[0];
    const description = content.split("# ")[2].split("\n")[0];
    return { html, name, description };
  } catch {
    return { html: "", name: "", description: "" };
  }
}

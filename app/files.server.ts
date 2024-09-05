import fs from "node:fs";
import path from "node:path";
import { parse } from "marked";
import { Project } from "@/components/Projects";
import { Blog } from "@/components/Blogs";

function getFiles(dir: string): string[] {
  return fs.readdirSync(dir);
}

function readFile(file: string): string {
  return fs.readFileSync(file, "utf8");
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

export async function getProjects(): Promise<Project[]> {
  // load all files from the projects folder
  console.log("Ci stiamo provando");
  const folderPath =
    process.env.NODE_ENV === "development"
      ? path.join(path.resolve(), "./@/projects")
      : path.join(__dirname, "..", "./@/projects");
  console.log(folderPath);
  const projectTitles = getFiles(folderPath);

  //   const projectTitles = getFiles(path.join(path.resolve(), "./@/projects"));

  //   read each file, parse using markdown and get the content
  //   read each file, parse using markdown and get the content
  const projects: Project[] = await Promise.all(
    projectTitles.map(async (project) => {
      const content = readFile(
        path.join(path.resolve(), "./@/projects", project)
      );
      const { html, name, description } = await parseMarkdown(content);
      return {
        name: name,
        description,
        id: project,
        html,
      };
    })
  );

  return projects;
}

export async function getBlogs(): Promise<Blog[]> {
  // load all files from the projects folder
  //   const BlogsTitles = getFiles(path.join(path.resolve(), "./@/blogs"));
  return [];
  const folderPath = path.join(__dirname, "..", "./@/blogs");
  const BlogsTitles = getFiles(folderPath);

  //   // read each file, parse using markdown and get the content
  const blogs: Blog[] = await Promise.all(
    BlogsTitles.map(async (blog) => {
      const content = readFile(path.join(path.resolve(), "./@/blogs", blog));
      const { html, name, description } = await parseMarkdown(content);
      return {
        title: name,
        description: description,
        id: blog,
        html,
      };
    })
  );

  return blogs;
}

export async function getProject(id: string): Promise<Project> {
  const content = readFile(path.join(path.resolve(), "./@/projects", id));
  const { html, name, description } = await parseMarkdown(content);
  return {
    name,
    description,
    id,
    html,
  };
}

export async function getBlog(id: string): Promise<Blog> {
  const content = readFile(path.join(path.resolve(), "./@/blogs", id));
  const { html, name, description } = await parseMarkdown(content);
  return {
    title: name,
    description,
    id,
    html,
  };
}

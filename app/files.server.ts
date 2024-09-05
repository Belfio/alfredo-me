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

function parseMarkdown(content: string): string | Promise<string> {
  return parse(content);
}

export async function getProjects(): Promise<Project[]> {
  // print me in consol.log the path to this here
  console.log(path.resolve());

  // load all files from the projects folder
  const projectTitles = getFiles(path.join(path.resolve(), "./@/projects"));
  console.log(projectTitles);
  //   read each file, parse using markdown and get the content
  const projects: Project[] = await Promise.all(
    projectTitles.map(async (project) => {
      const content = readFile(
        path.join(path.resolve(), "./@/projects", project)
      );
      const html = await parseMarkdown(content);
      return {
        name: project,
        description: project,
        id: project,
        html,
      };
    })
  );

  return projects;
}

export async function getBlogs(): Promise<Blog[]> {
  // load all files from the projects folder
  const BlogsTitles = getFiles(path.join(path.resolve(), "./@/blogs"));

  //   // read each file, parse using markdown and get the content
  const blogs: Blog[] = await Promise.all(
    BlogsTitles.map(async (blog) => {
      const content = readFile(path.join(path.resolve(), "./@/blogs", blog));
      const html = await parseMarkdown(content);
      return {
        title: blog,
        description: blog,
        id: blog,
        html,
      };
    })
  );

  return blogs;
}

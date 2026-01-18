import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "marked";

export type Blog = {
  title: string;
  description: string;
  id: string;
  html: string;
  createdAt: string;
};

export type Project = {
  name: string;
  description: string;
  id: string;
  html: string;
  createdAt: string;
};

// Get the base path for content files
function getContentPath(folder: "blogs" | "projects"): string {
  // In production, files are in the build output
  // In development, they're in the source directory
  return join(process.cwd(), "@", folder);
}

export async function getBlogs(): Promise<Blog[]> {
  const blogsPath = getContentPath("blogs");

  try {
    const files = await readdir(blogsPath);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const blogs = await Promise.all(
      mdFiles.map(async (filename) => {
        const id = filename.replace(".md", "");
        const content = await readFile(join(blogsPath, filename), "utf-8");
        const parsed = await parseMarkdown(content);

        if (!parsed.name || !parsed.description) {
          return null;
        }

        return {
          title: parsed.name,
          description: parsed.description,
          id,
          html: parsed.html,
          createdAt: parsed.createdAt,
        };
      })
    );

    return blogs.filter((blog): blog is Blog => blog !== null);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return [];
  }
}

export async function getBlog(id: string): Promise<Blog | null> {
  const blogsPath = getContentPath("blogs");
  const filePath = join(blogsPath, `${id}.md`);

  try {
    const content = await readFile(filePath, "utf-8");
    const parsed = await parseMarkdown(content);

    if (!parsed.name || !parsed.description) {
      return null;
    }

    return {
      title: parsed.name,
      description: parsed.description,
      id,
      html: parsed.html,
      createdAt: parsed.createdAt,
    };
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const projectsPath = getContentPath("projects");

  try {
    const files = await readdir(projectsPath);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const projects = await Promise.all(
      mdFiles.map(async (filename) => {
        const id = filename.replace(".md", "");
        const content = await readFile(join(projectsPath, filename), "utf-8");
        const parsed = await parseMarkdown(content);

        if (!parsed.name || !parsed.description || !parsed.createdAt) {
          return null;
        }

        return {
          name: parsed.name,
          description: parsed.description,
          id,
          html: parsed.html,
          createdAt: parsed.createdAt,
        };
      })
    );

    return projects.filter((project): project is Project => project !== null);
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const projectsPath = getContentPath("projects");
  const filePath = join(projectsPath, `${id}.md`);

  try {
    const content = await readFile(filePath, "utf-8");
    const parsed = await parseMarkdown(content);

    if (!parsed.name || !parsed.description || !parsed.createdAt) {
      return null;
    }

    return {
      name: parsed.name,
      description: parsed.description,
      id,
      html: parsed.html,
      createdAt: parsed.createdAt,
    };
  } catch {
    return null;
  }
}

async function parseMarkdown(content: string): Promise<{
  html: string;
  name: string;
  description: string;
  createdAt: string;
}> {
  try {
    const html = await parse(content);

    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const name = titleMatch ? titleMatch[1].trim() : "";

    // Extract description (second # heading, which is actually ## in the content)
    const lines = content.split("\n");
    let description = "";
    let foundFirst = false;
    for (const line of lines) {
      if (line.startsWith("# ")) {
        if (foundFirst) {
          // This is actually a ## heading used as description
          description = line.replace(/^#+ /, "").trim();
          break;
        }
        foundFirst = true;
      } else if (line.startsWith("## ")) {
        description = line.replace(/^## /, "").trim();
        break;
      }
    }

    const createdAt = getDateFromContent(content);

    return { html, name, description, createdAt };
  } catch {
    return { html: "", name: "", description: "", createdAt: "" };
  }
}

function getDateFromContent(content: string): string {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (isValidDate(line)) {
      return line;
    }
  }
  return "";
}

function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

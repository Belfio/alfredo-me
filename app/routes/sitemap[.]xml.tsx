import { getBlogs, getProjects } from "@/lib/markdown.server";

const BASE_URL = "https://albelfio.com";

export async function loader() {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);

  const staticPages = [
    { url: BASE_URL, lastmod: new Date().toISOString().split("T")[0], priority: "1.0" },
  ];

  const blogPages = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastmod: blog.createdAt || new Date().toISOString().split("T")[0],
    priority: "0.8",
  }));

  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/project/${project.id}`,
    lastmod: project.createdAt || new Date().toISOString().split("T")[0],
    priority: "0.8",
  }));

  const allPages = [...staticPages, ...blogPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import { getBlogs } from "@/lib/markdown.server";

const BASE_URL = "https://albelfio.com";

export async function loader() {
  const blogs = await getBlogs();

  // Sort by date, newest first
  const sortedBlogs = [...blogs].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alfredo Belfio's Blog</title>
    <description>Blog posts about technology, engineering, and projects by Alfredo Belfio.</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${sortedBlogs
  .map(
    (blog) => `    <item>
      <title><![CDATA[${blog.title}]]></title>
      <description><![CDATA[${blog.description}]]></description>
      <link>${BASE_URL}/blog/${blog.id}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${blog.id}</guid>
      <pubDate>${new Date(blog.createdAt).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import ArticleLink from "./ArticleLink";

export type Blog = {
  title: string;
  description: string;
  id: string;
  html: string;
  createdAt: string;
};

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  const blogsSorted = blogs.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    <div id="blog" className="my-8">
      <h1>Blog</h1>
      {blogsSorted.map((blog) => (
        <ArticleLink
          key={blog.id}
          title={blog.title}
          description={blog.description}
          id={blog.id}
          folder="blog"
          createdAt={blog.createdAt}
        />
      ))}
    </div>
  );
}

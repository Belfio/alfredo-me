import ArticleLink from "./ArticleLink";

export type Blog = {
  title: string;
  description: string;
  id: string;
  html: string;
};

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  return (
    <div id="blogs" className="my-8">
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <ArticleLink
          key={blog.id}
          title={blog.title}
          description={blog.description}
          id={blog.id}
          folder="blog"
        />
      ))}
    </div>
  );
}

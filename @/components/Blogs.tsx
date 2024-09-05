export type Blog = {
  title: string;
  description: string;
  id: string;
  html: string;
};

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  return (
    <div id="blogs" className="">
      <h1>Blogs</h1>
      {blogs.map((blog) => {
        if (!blog || typeof blog !== "object") {
          console.error("Invalid blog entry:", blog);
          return <div key={Math.random()}>Invalid blog entry</div>;
        }

        return (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <div>
              {blog.html ? (
                <div dangerouslySetInnerHTML={{ __html: blog.html }} />
              ) : (
                <p>No content available</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header>
      <nav
        className={cn(
          "m-auto w-[95%] sm:max-w-[1024px] rounded shadow-md bg-white p-4 ",
          className
        )}
      >
        <ul className="flex gap-4">
          <li>
            <a href="/#home" rel="noreferrer">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" rel="noreferrer">
              Projects
            </a>
          </li>
          <li>
            <a href="#blogs" rel="noreferrer">
              Blogs
            </a>
          </li>
          <li>
            <a href="#/contact" rel="noreferrer">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

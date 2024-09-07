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
        <ul className="flex gap-4 ">
          <li>
            <a
              href="/#home"
              rel="noreferrer"
              className="text-gray-900 visited:text-gray-900 hover:text-blue-800"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/#projects"
              rel="noreferrer"
              className="text-gray-900 visited:text-gray-900 hover:text-blue-800"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/#blog"
              rel="noreferrer"
              className="text-gray-900 visited:text-gray-900 hover:text-blue-800"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              rel="noreferrer"
              className="text-gray-900 visited:text-gray-900 hover:text-blue-800"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

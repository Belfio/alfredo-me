import { cn } from "@/lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header>
      <nav
        className={cn(
          "m-auto w-[95%] sm:max-w-[1024px] rounded shadow-md bg-white p-4",
          className
        )}
      >
        <ul className="flex">
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              Questo è il sito di Alfredo campioneeeaa
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import DOMPurify from "dompurify";

export default function Article({ html }: { html: string }) {
  // DOMPurify needs a browser window; on the Lambda SSR pass the HTML is
  // trusted (authored markdown in this repo) and sanitization happens on
  // the client after hydration
  const sanitizedHtml =
    typeof window === "undefined" ? html : DOMPurify.sanitize(html);
  return (
    <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}

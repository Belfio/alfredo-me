export default function Article({ html }: { html: string }) {
  return (
    <div className="m-auto w-[95%] sm:max-w-[1024px] py-8 px-4">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "alfredo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: { aws: "6.66.2" },
    };
  },
  async run() {
    const site = new sst.aws.Remix("Alfredo-Site", {
      domain:
        $app.stage === "prod"
          ? {
              name: "albelfio.com",
              dns: sst.cloudflare.dns(),
            }
          : undefined,
      transform: {
        server: {
          // markdown.server.ts reads blog/project .md files from disk at
          // runtime, so they must ship inside the Lambda bundle
          copyFiles: [
            { from: "@/blogs", to: "@/blogs" },
            { from: "@/projects", to: "@/projects" },
          ],
        },
      },
    });
    return {
      url: site.url,
    };
  },
});

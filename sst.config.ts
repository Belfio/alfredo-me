// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "alfredo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: { aws: "6.50.1" },
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
    });
    return {
      url: site.url,
    };
  },
});

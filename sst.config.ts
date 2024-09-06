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
      domain: {
        name: "albelfio.com",
        dns: sst.cloudflare.dns({
          override: true,
        }),
      },
    });
    return {
      url: site.url,
    };
  },
});

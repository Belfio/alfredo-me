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
    const carmageddonBehavior = {
      targetOriginId: "carmageddon",
      viewerProtocolPolicy: "redirect-to-https",
      allowedMethods: [
        "DELETE",
        "GET",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT",
      ],
      cachedMethods: ["GET", "HEAD"],
      compress: true,
      // CloudFront Managed-CachingDisabled & Managed-AllViewerExceptHostHeader
      cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
      originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac",
    };

    const site = new sst.aws.Remix("Alfredo-Site", {
      domain:
        $app.stage === "prod"
          ? {
              name: "albelfio.com",
              dns: sst.cloudflare.dns(),
            }
          : undefined,
      transform: {
        cdn: (args) => {
          args.origins = $resolve(args.origins).apply((origins) => [
            ...origins,
            {
              originId: "carmageddon",
              domainName: "carmageddon.a-belfiori.workers.dev",
              customOriginConfig: {
                httpPort: 80,
                httpsPort: 443,
                originProtocolPolicy: "https-only",
                originReadTimeout: 60,
                originSslProtocols: ["TLSv1.2"],
              },
            },
          ]);
          args.orderedCacheBehaviors = [
            { pathPattern: "/carmageddon", ...carmageddonBehavior },
            { pathPattern: "/carmageddon/*", ...carmageddonBehavior },
          ];
        },
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

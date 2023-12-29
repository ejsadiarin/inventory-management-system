const { flatRoutes } = require("remix-flat-routes");

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*"],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverDependenciesToBundle: [
    "lucia",
    "lucia/middleware",
    "lucia/polyfill/node",
    "@lucia-auth/adapter-postgresql",
  ],
};

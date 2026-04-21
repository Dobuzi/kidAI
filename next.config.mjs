const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "kidAI";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  ...(isGitHubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}`
      }
    : {})
};

export default nextConfig;

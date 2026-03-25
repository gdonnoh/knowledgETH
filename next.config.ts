import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Required with Turbopack so MDXRemote receives custom `components` correctly
  // https://github.com/hashicorp/next-mdx-remote#installation
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;

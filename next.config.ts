import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        //  Accepter sulement les protocoles https
        protocol: "https",

        // Accepter n'importe quelle hostname
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

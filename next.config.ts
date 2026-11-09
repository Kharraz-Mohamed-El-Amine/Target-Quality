import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // les modules d'icônes ne chargent que ce qui est importé
  experimental: { optimizePackageImports: ["lucide-react"] },
};

export default nextConfig;

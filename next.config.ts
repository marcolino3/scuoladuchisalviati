import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lucide-react 1.17.0 hat einen sehr grossen Barrel-Export, der unter
  // Turbopack beim Auswerten brechen kann ("X is not defined") und damit die
  // Hydration aller Seiten mit Icons stoert. optimizePackageImports loest jedes
  // `import { Icon } from "lucide-react"` in einen Deep-Import auf, sodass der
  // Barrel nie komplett ausgewertet wird.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

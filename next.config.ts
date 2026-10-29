import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Même déploiement que Medicaris : Cap Connect (cPanel Node.js). Ne pas retirer.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "xzpeeulqxrpwpkhdadfi.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;

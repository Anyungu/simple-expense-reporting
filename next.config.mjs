/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["zbvaqdcopdeggeweathe.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zbvaqdcopdeggeweathe.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

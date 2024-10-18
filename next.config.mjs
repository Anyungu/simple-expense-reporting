/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["zbvaqdcopdeggeweathe.supabase.co", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zbvaqdcopdeggeweathe.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

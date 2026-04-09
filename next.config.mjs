import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.modules = [path.join(__dirname, 'node_modules'), 'node_modules', ...(config.resolve.modules || [])];
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    NAME_TOKEN: process.env.NAME_TOKEN,
  },
};


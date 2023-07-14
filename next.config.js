/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sunnusu-next.s3.ap-northeast-2.amazonaws.com"],
  },
  env: {
    NEXTAUTH_SECRET: "PnnuTM5UCXwCjdu5j36G",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.openai.com/:path*",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;

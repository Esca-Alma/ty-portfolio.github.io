import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = '';

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
  // ユーザーページ(username.github.io)ではなく、プロジェクトページの場合のみbasePathを設定
  if (!process.env.GITHUB_REPOSITORY.match(/^[^\/]+\/\.github\.io$/)) {
    basePath = `/${repoName}`;
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath === '' ? undefined : basePath,
};

export default nextConfig;

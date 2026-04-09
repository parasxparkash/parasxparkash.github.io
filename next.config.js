/** @type {import('next').NextConfig} */
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const isUserOrOrgPagesRepo = repository.endsWith('.github.io')
const basePath = isGithubActions && repository && !isUserOrOrgPagesRepo ? `/${repository}` : ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    domains: ['ghchart.rshah.org', 'cdn.jsdelivr.net'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig

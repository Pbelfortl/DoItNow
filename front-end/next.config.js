/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  compiler: {
    //nextConfig(before)
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}
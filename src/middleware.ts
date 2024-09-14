export { default } from "next-auth/middleware"

export const config = { matcher: ['/admin/:path*', '/api/images/:path*']}
// Middleware removed - Clerk authentication has been removed
export default function middleware() {
  // No authentication middleware needed
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

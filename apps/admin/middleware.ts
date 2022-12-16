import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// middleware to perform protected routes
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		// This logic is only applied to /dashboard
		return NextResponse.next();
	}
	if (request.nextUrl.pathname.startsWith("/auth/signin")) {
		// This logic is only applied to /auth/signin
		return NextResponse.next();
	}
	// any other path redirect to /auth/signin
	return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|favicon.ico).*)",
	],
};

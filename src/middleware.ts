import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  if (accessToken && ["/sign-in", "/"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!accessToken && ["/sign-in", "/"].includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  console.log("Access token:", accessToken);
  if (
    !accessToken &&
    ["/dashboard", "/new-document"].some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/", "/dashboard/:path*", "/new-document/:path*"],
};

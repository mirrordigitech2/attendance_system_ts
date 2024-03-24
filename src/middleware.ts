import { NextResponse, NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  let userCookie = request.cookies.get("user");
  console.log(userCookie);

  const { pathname } = request.nextUrl;
  if (pathname == "/") {
    console.log("hey its homepage");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (pathname == "/users") {
    if (!userCookie) {
      console.log(" its user");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (pathname == "/schools") {
  }
  return NextResponse.next();
}

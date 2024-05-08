// import { NextResponse, NextRequest } from "next/server";
// export function middleware(request: NextRequest) {
//   let userCookie = request.cookies.get("user");
//   console.log(userCookie);

//   const { pathname } = request.nextUrl;
//   if (pathname == "/") {
//     console.log("hey its homepage");
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   } else if (pathname == "/usersX") {
//     if (!userCookie) {
//       console.log(" its user");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   } else if (pathname == "/schools") {
//   }
//   return NextResponse.next();
// }

// import { withAuth } from "next-auth/middleware";

// export default withAuth;

// export const config = {
//   matcher: [
//     // "/dashboard/:path*",
// "/dashboard",
// "/users",
// "/schools",
// "/courses",
// "/students",
// // "/:path*",
//   ],
// };
// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware"

import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: [
    // '/dashboard/:path*',
    //"/dashboard",
    // '/((?!api|static|favicon.ico|login).*)',
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};

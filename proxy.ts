// import { cookies } from 'next/headers';
import { getNewAccessToken } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = ["/", "/properties"];


export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    // const response = NextResponse.next();
    if(!decodedAccessToken?.success && decodedRefreshToken?.success){
        //access token has expired but refresh token is valid, get new access token from backend
        const result = await getNewAccessToken();

        if(result.success){
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken , {
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                sameSite : "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);


        }
    }


    let userRole = null;

    if(!decodedAccessToken?.success){
        //token has expired or is invalid, clear the cookies
        cookieStore.delete("accessToken");
        // return NextResponse.redirect(new URL('/login', request.url));
    }

    if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    //user is logged in and trying to access login or register page, redirect to dashboard or root home page
      if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "TENANT") {
          return NextResponse.redirect(new URL("/tenant-dashboard", request.url));
        } else if (userRole === "LANDLORD") {
          return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
        } else if (userRole === "ADMIN") {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
      }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    // Authenticated Pages Protection : Authorization is not handled yet
    if(!accessToken && !isPublicRoute && !isAuthRoute){
        const loginUrl = new URL('/auth/login', request.url)

        loginUrl.searchParams.set("redirectTo", pathname)

        return NextResponse.redirect(loginUrl);
    }

      // Role-based route protection
      if (pathname.startsWith("/tenant-dashboard") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/not-found", request.url));
      } else if (pathname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL("/not-found", request.url));
      } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ],
}
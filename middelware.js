import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
    const token = req.cookies.get("id_token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }
    try {
        jwtDecode(token); // decode token (basic check)
        return NextResponse.next();
    } catch (err) {
        console.error("Auth failed", err);
        return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }
}
export const config = {
    matcher: ["/gallery/:path*", "/dashboard/:path*"], // add your private routes
};
import { NextResponse } from "next/server";

export async function GET(req) {
    const res = NextResponse.redirect(new URL("/", req.url));

    res.cookies.set("id_token", "", { maxAge: 0, path: "/" });
    res.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });

    return res;
}
import { getCognitoClient } from "@/app/lib/cognito";
import { NextResponse } from "next/server";

export async function GET(req) {
    const client = await getCognitoClient()
    // const url = new URL(req.url)
    const params = client.callbackParams(req.url);
    const tokenSet = await client.callback(
        "http://localhost:3000/api/auth/callback",
        params
    )
    const res = NextResponse.redirect(new URL("/", req.url));

    res.cookies.set("id_token", tokenSet.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    if (tokenSet.refresh_token) {
        res.cookies.set("refresh_token", tokenSet.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
    }

    return res
}
import { getCognitoClient } from "@/app/lib/cognito";
import { NextResponse } from "next/server";


export async function GET() {

    const client = await getCognitoClient();
    const url = client.authorizationUrl({
        scope: "email openid phone",
        redirect_uri: "http://localhost:3000/api/auth/callback",
        response_type: "code",
    })
    return NextResponse.redirect(url)
}
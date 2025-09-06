import { Issuer } from 'openid-client'

let client

export async function getCognitoClient(params) {
    if (client) return client

    const region = process.env.COGNITO_REGION;
    const userPoolId = process.env.COGNITO_USER_POOL;

    if (!region || !userPoolId) {
        throw new Error("COGNITO_REGION or COGNITO_USER_POOL is not set in .env.local");
    }

    const issuer = await Issuer.discover(`https://cognito-idp.${region}.amazonaws.com/${userPoolId}`);
    client = new issuer.Client({
        client_id: process.env.COGNITO_CLIENT_ID,
        client_secret: process.env.COGNITO_CLIENT_SECRET,
        redirect_uris: [`${process.env.NEXTAUTH_URL}/api/auth/callback`],
        response_types: ['code']
    })
    console.log(region)
    console.log(userPoolId)
    return client
}
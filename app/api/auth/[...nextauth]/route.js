import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const region = process.env.COGNITO_REGION;
const userPoolId = process.env.COGNITO_USER_POOL;

const handler = NextAuth({

    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.sub = token.sub;
            return session;
        },
    },
    session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };

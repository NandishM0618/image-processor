
const awsConfig = {
    Auth: {
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL,
        userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    },
};

export default awsConfig;

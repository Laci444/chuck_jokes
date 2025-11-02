function createFakeToken(username) {

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 60 * 60; // expires in 1 hour

    const payload = {
        token_type: "access",
        exp,
        iat: now,
        jti: "mock-id",
        sub: "1",
        username,
    };

    const header = btoa(JSON.stringify({alg: "HS256", typ: "JWT"}));
    const body = btoa(JSON.stringify(payload));
    const signature = "mock-signature";

    return `${header}.${body}.${signature}`;
}

export const mockAuth = {
    async login(credentials) {
        return {
            refresh: createFakeToken("ajohnson"),
            access: createFakeToken("ajohnson"),
        };
    },

    async refreshAccessToken(refreshToken) {
        return {
            access: createFakeToken("ajohnson"),
        };
    },
    async register(userData) {
        return {success: true, username: userData.username, email: userData.email};
    }
};

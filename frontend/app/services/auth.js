import {mockAuth} from "./mockAuth";
import {backend} from "./axiosProvider";

const authImpl = {
    async login(credentials) {
        return backend
            .post("/auth/token", credentials)
            .then((r) => r.data);
    },

    async refreshAccessToken(refreshToken) {
        return backend
            .post("/auth/token/refresh", {refresh: refreshToken})
            .then((r) => r.data);
    },

    async register(userData) {
        return backend
            .post("/auth/register/", userData)
            .then((r) => r.data);
    }

};


export const auth =
    import.meta.env.VITE_API_MODE === "mock" ? mockAuth : authImpl;

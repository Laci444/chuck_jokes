import {backend} from "./axiosProvider.js";
import {mockApi} from "./mockApi.js";
import {id} from "zod/locales";

const apiImpl = {

    likeJoke(id, data, authHeader) {
        return backend.post(`api/jokes/${id}/likes/`, data, {
            headers: {
                Authorization: authHeader,
            },
        } ).then((r) => r.data);
    },

    getJokeList(limit = 10) {
        return backend.get("api/jokes/").then(r => r.data.slice(0, limit));
    },

    getLikes(id, authHeader) {
        return backend
            .get(`api/jokes/${id}/likes/`, {
                headers: authHeader ? { Authorization: authHeader } : {},
            })
            .then((r) => r.data);
    }

}

export const api =
    import.meta.env.VITE_API_MODE === "mock" ? mockApi : apiImpl;

import {backend} from "./axiosProvider.js";
import {mockApi} from "./mockApi.js";

const apiImpl = {
    likeJoke(joke) {
        return backend.post("/api/jokes/", joke).then((r) => r.data);
    }
}

export const api = import.meta.env.VITE_API_MODE === "mock" ? mockApi : apiImpl;

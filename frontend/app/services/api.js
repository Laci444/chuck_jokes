import {backend} from "~/services/axiosProvider.js";
import {mockApi} from "~/services/mockApi.js";

const apiImpl = {
    likeJoke(joke) {
        return backend.post("/api/jokes/", joke).then((r) => r.data);
    }
}

export const api = import.meta.env.VITE_API_MODE === "mock" ? mockApi : apiImpl;

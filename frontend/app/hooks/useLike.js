import { useState } from "react";
import { api } from "../services/api";
import { toast } from "sonner";
import { useIsAuthenticated } from "./useIsAuthenticated";

export function useLike() {
    const [likedJokes, setLikedJokes] = useState({});
    const isAuthenticated = useIsAuthenticated();

    const likeJoke = async (joke) => {
        if (!isAuthenticated) {

            return false;
        }

        if (likedJokes[joke.id]) {
            toast("You already liked this joke!");
            return false;
        }

        try {
            const res = await api.likeJoke(joke);
            if (res.success) {
                setLikedJokes((prev) => ({ ...prev, [joke.id]: true }));
                return true;
            } else {
                toast.error("Failed to like joke.");
                return false;
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to like joke.");
            return false;
        }
    };

    const isLiked = (joke) => likedJokes[joke.id] || false;
    return { likeJoke, isLiked };
}

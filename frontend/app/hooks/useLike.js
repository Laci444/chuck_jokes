import { useState, useCallback } from "react";
import { api } from "../services/api.js";
import { toast } from "sonner";
import { useIsAuthenticated } from "./useIsAuthenticated";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export function useLike() {
    const isAuthenticated = useIsAuthenticated();
    const authHeader = useAuthHeader();
    const authUser = useAuthUser();

    const username = authUser?.username;

    const [likedJokes, setLikedJokes] = useState({});

    const fetchLikes = useCallback(async (jokes) => {
        if (!isAuthenticated || !username) {
            return jokes.map(j => ({ ...j, liked: false }));
        }

        try {
            const updated = await Promise.all(
                jokes.map(async (joke) => {
                    const likes = await api.getLikes(joke.id, authHeader);

                    const liked = likes.some(like =>
                        like.username.toLowerCase() === username.toLowerCase()
                    );

                    return { ...joke, liked };
                })
            );

            const likedMap = {};
            updated.forEach(j => likedMap[j.id] = j.liked);
            setLikedJokes(likedMap);

            return updated;
        } catch (err) {
            console.error("Failed to fetch likes", err);
            return jokes.map(j => ({ ...j, liked: false }));
        }
    }, [isAuthenticated, username, authHeader]);

    const likeJoke = useCallback(async (joke) => {
        if (!isAuthenticated) {
            toast("Please login to like a joke!");
            return false;
        }

        if (likedJokes[joke.id]) {
            toast("You already liked this joke!");
            return false;
        }

        setLikedJokes(prev => ({ ...prev, [joke.id]: true }));

        try {
            await api.likeJoke(joke.id, {}, authHeader);
            //toast.success("You liked this joke!");
            return true;
        } catch (err) {
            const status = err?.response?.status;

            if ( status === 409 ) {
                toast("You already liked this joke!");
                return false;
            }

            console.error("Failed to like", err);
            toast.error("Failed to like joke.");

            setLikedJokes(prev => {
                const next = { ...prev };
                delete next[joke.id];
                return next;
            });

            return false;
        }
    }, [isAuthenticated, authHeader, likedJokes]);

    const isLiked = useCallback(
        (joke) => !!likedJokes[joke.id],
        [likedJokes]
    );

    return { fetchLikes, likeJoke, isLiked };
}

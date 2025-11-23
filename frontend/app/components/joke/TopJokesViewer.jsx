import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card.jsx";
import { Heart, HeartOff } from "lucide-react";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useLike } from "../../hooks/useLike.js";
import { api } from "../../services/api.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

export default function TopJokes() {
    const [jokes, setJokes] = useState([]);
    const isAuthenticated = useIsAuthenticated();
    const authHeader = useAuthHeader();

    const { likeJoke, isLiked, fetchLikes } = useLike();

    const normalizeJoke = (j) => ({
        ...j,
        id: j.id ?? j.external_id,
        likes: j.like_count ?? 0,
    });

    useEffect(() => {
        const load = async () => {
            try {
                const data = await api.getJokeList(10);
                const normalized = data.map(normalizeJoke);

                if (isAuthenticated && authHeader) {
                    const enriched = await fetchLikes(normalized);
                    setJokes(enriched);
                } else {
                    setJokes(normalized);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load top jokes.");
            }
        };

        if (isAuthenticated && !authHeader) return;

        load();
    }, [isAuthenticated, authHeader, fetchLikes]);

    const handleLike = async (joke) => {
        if (!isAuthenticated) {
            toast("Please login to like a joke!");
            return;
        }

        const success = await likeJoke(joke);

        if (success) {
            setJokes((prev) =>
                prev.map((j) =>
                    j.id === joke.id
                        ? {
                            ...j,
                            likes: (j.likes || 0) + 1,
                            liked: true,
                        }
                        : j
                )
            );
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Top Jokes</h2>

            {jokes.length === 0 ? (
                <p>Loading jokes...</p>
            ) : (
                jokes.map((joke) => (
                    <Card key={joke.id} className="w-full max-w-md mx-auto">
                        <CardContent>
                            <p>{joke.text}</p>
                        </CardContent>

                        <CardFooter className="flex items-center space-x-2">
                            <div
                                className="flex items-center space-x-4 cursor-pointer"
                                onClick={() => handleLike(joke)}
                            >
                                {isAuthenticated ? (
                                    isLiked(joke) ? (
                                        <Heart className="fill-current w-5 h-5" />
                                    ) : (
                                        <Heart className="w-5 h-5" />
                                    )
                                ) : (
                                    <HeartOff className="opacity-50" />
                                )}

                                <span className="ml-2">{joke.likes} likes</span>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            )}
        </div>
    );
}

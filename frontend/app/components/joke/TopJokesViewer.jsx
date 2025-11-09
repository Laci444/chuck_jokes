import React, {useEffect, useState} from "react";
import {api} from "../../services/api";
import {Heart, HeartOff} from "lucide-react"
import {Card, CardContent, CardFooter} from "../ui/card.jsx";
import {useLike} from "../../hooks/useLike.js";
import {useIsAuthenticated} from "../../hooks/useIsAuthenticated.js";

export default function TopJokesViewer() {
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(true);
    const {likeJoke, isLiked} = useLike();
    const isAuthenticated = useIsAuthenticated();

    const handleLike = async (joke) => {
        const liked = await likeJoke(joke);
        if (liked) {
            setJokes((prev) => prev.map((j) => (j.id === joke.id ? {...j, like_count: j.like_count + 1} : j)));
        }
    };

    useEffect(() => {
        fetchTopJokes();
    }, []);

    async function fetchTopJokes() {
        setLoading(true);
        try {
            const topJokes = await api.getTopJokes?.() || await api.getJokeList();
            setJokes(topJokes);
        } catch (err) {
            console.error("Error fetching jokes:", err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading top jokes...</p>;

    return (<div className="space-y-4">
        <h2 className="text-2xl font-bold">Top Jokes</h2>
        {jokes.map((joke) => (<Card key={joke.id} className="w-full max-w-md mx-auto">
            <CardContent>
                <p>{joke.value}</p>
            </CardContent>
            <CardFooter className="flex items-center space-x-2">
                    {joke && (
                        <div onClick={() => handleLike(joke)} className="cursor-pointer">
                            {isAuthenticated
                                ? isLiked(joke)
                                    ? <Heart className="fill-current w-5 h-5"/>
                                    : <Heart className="w-5 h-5"/>
                                : <HeartOff className="w-5 h-5"/>
                            }
                        </div>
                    )}
                <span>{joke.like_count}</span>
            </CardFooter>
        </Card>))}
    </div>);
}

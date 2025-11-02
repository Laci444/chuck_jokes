import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import {Heart} from "lucide-react"
import {Card, CardContent, CardFooter} from "../ui/card.jsx";
export default function TopJokesViewer() {
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch top jokes on mount
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

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Top Jokes</h2>
            {jokes.map((joke) => (
                <Card key={joke.id} className="w-full max-w-md mx-auto">
                    <CardContent>
                        <p>{joke.value}</p>
                    </CardContent>
                    <CardFooter className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>{joke.like_count}</span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

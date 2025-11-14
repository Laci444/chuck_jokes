import { useState, useEffect } from "react";
import {Card, CardContent, CardTitle} from "../components/ui/card.jsx";
import {Share} from "lucide-react";

export default function JokeOfTheDay() {
    const [joke, setJoke] = useState(null);

    const fetchNewJoke = async () => {
        try {
            const response = await fetch("https://api.chucknorris.io/jokes/random");
            const data = await response.json();

            const today = new Date().toISOString().slice(0, 10);
            localStorage.setItem("jokeOfTheDay", JSON.stringify({ joke: data, date: today }));

            setJoke(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("jokeOfTheDay");

        if (saved) {
            const { joke, date } = JSON.parse(saved);
            const today = new Date().toISOString().slice(0, 10);

            if (date === today) {
                setJoke(joke);
                return;
            }
        }

        fetchNewJoke();
    }, []);

    return (
            <Card className="w-full max-w-md mx-4 sm:mx-0 items-center">
                <CardTitle className="font-bold text-2xl">Joke of The Day</CardTitle>
                <CardContent className="flex flex-col items-center text-center space-y-4">
                    <p className="text-lg">
                        {joke ? joke.value : "Loading joke..."}
                    </p>
                </CardContent>
            </Card>
    );
}

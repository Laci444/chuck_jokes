import {Card, CardContent, CardFooter} from "../ui/card.jsx";
import {useEffect, useState} from "react";
import {Button} from "../ui/button.jsx";
import {useIsAuthenticated} from "../../hooks/useIsAuthenticated";
import {backend} from "../../services/axiosProvider";
import {mockApi} from "../../services/mockApi.js";
import {toast} from "sonner";
import {Heart, HeartOff} from "lucide-react";

export default function JokeViewer() {
    const [joke, setJoke] = useState(null);
    const [message, setMessage] = useState(null);
    const [liked, setLiked] = useState(false);
    const isAuthenticated = useIsAuthenticated();

    const fetchJoke = async () => {
        try {
            const response = await fetch("https://api.chucknorris.io/jokes/random")
            const data = await response.json();
            setJoke(data);
            setLiked(false);
        } catch (err) {
            console.error(err);
        }
    }

    const handleLike = async () => {
        if (!isAuthenticated) {
            toast("Please log in to jokes!");
            return;
        }

        try {
            const res = await mockApi.likeJoke(joke);
            if (res.success) {
                toast.success("Joke liked!");
                setLiked(true);
                setMessage("Joke liked and saved!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to like joke.");
            setMessage("Failed to like joke.");
        }
    };

    return (
        <Card className="w-full max-w-md mx-4 sm:mx-0">
            <CardContent className="flex flex-col items-center text-center space-y-4">
                {joke ? <p className="text-lg">{joke.value}</p> : <p>Click the button to get a joke!</p>}

                {joke && (
                    <div onClick={handleLike} className="cursor-pointer">
                        {isAuthenticated
                            ? liked
                                ? <Heart className="fill-current"/>
                                : <Heart/>
                            : <HeartOff/> // show HeartOff if not logged in
                        }
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={fetchJoke}>Generate</Button>

            </CardFooter>
        </Card>
    )
}
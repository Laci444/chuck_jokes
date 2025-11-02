import {useAuth} from "../context/useAuth.jsx";
import {useState} from "react";
import axios from "axios";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import {Button} from "./ui/button.jsx";

export default function JokeViewer() {
    const { isAuthenticated } = useAuth()
    const [joke, setJoke] = useState(null)
    const [liked, setLiked] = useState(false)

    const fetchJoke = async () => {
        try {
            const response = await fetch("https://api.chucknorris.io/jokes/random")
            const data = await response.json()
            setJoke(data)
            setLiked(false)
        } catch (err) {
            console.error("Failed to fetch joke:", err)
        }
    }

    const likeJoke = async () => {
        if (!joke || liked || !isAuthenticated) return
        setLiked(true)

        try {
            await axios.post('/api/jokes', {
                jokeId: joke.id,
                joke: joke.value,
            })
            console.log('Joke saved to backend!')
        } catch (err) {
            console.error('Failed to save joke:', err)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card>
                <CardContent className="flex flex-col items-center text-center space-y-4">
                    {joke ? (
                        <>
                            <p className="text-lg">{joke.value}</p>
                            <button
                                onClick={likeJoke}
                                disabled={!isAuthenticated || liked}
                                className="text-2xl"
                            >
                                {liked ? '❤️' : '🤍'}
                            </button>
                        </>
                    ) : (
                        <p>Click the button to get a joke!</p>
                    )}
                </CardContent>

                <CardFooter className="justify-center">
                    <Button onClick={fetchJoke}>Generate</Button>
                </CardFooter>
            </Card>
        </div>

    )
}

import {useAuth} from "../context/useAuth.jsx";
import {useState} from "react";
import axios from "axios";

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
        <div className="flex items-center justify-center h-screen text-black flex-col gap-4 text-center">
            <div className="bg-transparent p-8 rounded shadow-2xl break-words w-[600px] min-h-[200px] text-center justify-center">
                <p className="mb-4 ">
                    {joke ? joke.value : "Click the button to get a joke!"}
                </p>

                {joke && (
                    <>
                        <button onClick={likeJoke} disabled={!isAuthenticated || liked} className="text-2xl">
                            {liked ? '❤️' : '🤍'}
                        </button>
                        {!isAuthenticated && (
                            <p className="text-sm mt-2 text-red-600">You must be logged in to like jokes.</p>
                        )}
                    </>
                )}
            </div>

            <button
                onClick={fetchJoke}
                className="hover:bg-blue-300 text-black  px-6 py-3 rounded-4xl cursor-pointer"
            >
                Generate joke
            </button>
        </div>
    )
}

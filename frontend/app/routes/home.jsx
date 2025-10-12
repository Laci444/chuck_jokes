import {Link} from "react-router";
import {useEffect, useState} from "react";

export function meta() {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    const [joke, setJoke] = useState("");

    const fetchJokes = async () => {
        fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(joke => setJoke(joke.value))
    }

    useEffect(() => {
        fetch('/api/users')
    }, [])

    return (
        <>
            <div>
                <Link to="/login" className="text-black p-4 bg-gray-300 rounded-2xl m-2">Login</Link>
                <Link to="/signup" className="text-black p-4 bg-gray-300 rounded-2xl">Sign Up</Link>
            </div>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-transparent text-white p-20 rounded shadow-2xl break-all">
                    <p className="text-black ">{joke}</p>
                    <button onClick={fetchJokes}
                            className="block hover:bg-blue-300 text-black  text-lg mx-auto p-4 rounded-4xl cursor-pointer">Generate
                        a joke
                    </button>
                </div>
            </div>
        </>
    );
}

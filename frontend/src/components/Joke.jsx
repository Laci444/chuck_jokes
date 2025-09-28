import React, {useState} from 'react'

function Joke() {

    const [joke, setJoke] = useState(false);

    const fetchJokes = async () => {
        fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(joke => setJoke(joke.value))
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-transparent text-white p-20 rounded shadow-2xl break-all">
                    <p className="text-black ">{joke}</p>
                    <button onClick={fetchJokes} className="block hover:bg-blue-300 text-black  text-lg mx-auto p-4 rounded-4xl cursor-pointer">Generate a joke</button>
                </div>
            </div>
        </>
    )
}

export default Joke

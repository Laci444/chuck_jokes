import {Link} from "react-router";
//import {useEffect, useState} from "react";
import JokeViewer from "../components/JokeViewer.jsx";

export function meta() {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    return (
        <>
            <div>
                <Link to="/login" >
                    <button className="text-black p-4 bg-gray-300 rounded-2xl m-2 cursor-pointer">
                        Sign In
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="text-black p-4 bg-gray-500 rounded-2xl m-2 cursor-pointer">
                        Sign Up
                    </button>
                </Link>
            </div>
            <JokeViewer/>
        </>
    );
}

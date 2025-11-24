import {index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("top-jokes", "routes/topJokes.jsx"),
    route("joke-of-the-day", "routes/jokeOfTheDay.jsx"),
];

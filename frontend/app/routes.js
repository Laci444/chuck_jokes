import {index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("top-jokes", "routes/topJokes.jsx"),
    route("list-users", "routes/listUsers.jsx"),
];

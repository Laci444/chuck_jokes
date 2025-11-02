import {Link} from "react-router";
//import {useEffect, useState} from "react";
import JokeViewer from "../components/JokeViewer";
import {LoginDialog} from "../components/LoginDialog"
import Header from "../layout/header";


export default function Home() {
    return (
        <>
            <Header/>
            <JokeViewer/>
        </>
    );
}

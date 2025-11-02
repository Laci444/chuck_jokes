
import { Link } from "react-router";
import { ThemeToggle } from "../components/themeToggle";
import {LoginDialog} from "../components/LoginDialog.jsx";
import {SignUpDialog} from "../components/SignUpDialog.jsx";

export default function Header() {


    return (
        <header className="flex items-center justify-between w-full px-8 py-4">
            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>
            <Link to="/" className="flex-1 text-center">
                <h1 className="text-2xl font-bold">CJ</h1>
            </Link>
            <div className="flex items-center gap-4">
                <LoginDialog />
                <SignUpDialog />
            </div>
        </header>
    );
}

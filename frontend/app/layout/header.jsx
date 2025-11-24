import {AuthDialog} from "../components/auth/AuthDialog.jsx";
import {Link} from "react-router";
import {ThemeToggle} from "../components/themeToggle";
import Logo from "./resources/logo.svg?react";
import LogoutDropdown from "../components/auth/LogoutDropdown.jsx";
import Navigation from "../components/navigation";
import {useIsAuthenticated} from "../hooks/useIsAuthenticated";

export default function Header() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <header className="flex flex-col items-center w-full p-4 sm:p-6">
            <div className="flex justify-between items-center w-full max-w-5xl">
                <ThemeToggle/>
                <Link to="/">
                    <Logo className="h-10 w-10 sm:h-12 sm:w-12 dark:invert"/>
                </Link>

                {isAuthenticated ? (
                    <LogoutDropdown/>
                ) : (
                    <AuthDialog/>
                )}
            </div>
            <nav className="mt-4 w-full flex justify-center">
                <Navigation/>
            </nav>
        </header>
    );
}

import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import "./app.css";
import createAuthStore from "react-auth-kit/store/createAuthStore";
import createRefresh from "react-auth-kit/refresh/createRefresh";
import AuthProvider from "react-auth-kit";
import {refresh} from "./lib/authTokenRefresh";
import Header from "./layout/header";
import {ThemeProvider} from "./components/themeProvider.jsx";
import {Toaster} from "./components/ui/sonner.jsx";

const base = import.meta.env.BASE_URL;

export const links = () => [
    {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    {
        rel: "android-chrome-192x192",
        href: base + "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
    },
    {
        rel: "android-chrome-512x512",
        href: base + "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
    },
    {
        rel: "apple-touch-icon",
        href: base + "apple-touch-icon.png",
        sizes: "180x180",
    },
    {
        rel: "icon",
        href: base + "favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
    },
    {
        rel: "icon",
        href: base + "favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
    },
    {
        rel: "manifest",
        href: base + "site.webmanifest",
    },
];

export function Layout({children}) {
    return (
        <html lang="en">
        <head>
            <title>Chuck Jokes</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    const authStore = createAuthStore("localstorage", {
        authName: "auth",
        refresh: createRefresh(refresh),
    });
    return (
        <ThemeProvider>
            <AuthProvider store={authStore}>
                <div className="flex flex-col min-h-screen">
                    <Header/>
                    <main className="flex-1 flex justify-center items-center p-4 sm:p-10">
                        <Outlet/>
                    </main>
                    <Toaster/>
                </div>
            </AuthProvider>
        </ThemeProvider>
    )
}

export function ErrorBoundary({error}) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}

import {Link} from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../components/ui/navigation-menu";

const navigationItems = {
    Generate: "/",
    "Joke of The Day": "/joke-of-the-day",
    "Top Jokes": "/top-jokes",
};

export default function Navigation() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {Object.entries(navigationItems).map(([label, path], index) => (
                    <NavigationMenuItem key={index}>
                        <NavigationMenuLink asChild>
                            <Link to={path}>{label}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

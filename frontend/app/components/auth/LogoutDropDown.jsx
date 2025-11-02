import { Button } from "../ui/button";
import { LogIn, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";
import {AuthDialog} from "../auth/AuthDialog.jsx";

export default function LogoutDropdown() {
    const signOut = useSignOut();
    const authUser = useAuthUser();

    const handleLogout = async () => {
        signOut();
        toast.success("Signed out");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <User />
                    Profile
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>{authUser?.username}</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogIn />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useForm } from "react-hook-form";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { auth } from "../../services/auth";
import { toast } from "sonner";
import {Button} from "../ui/button.jsx";
import {data} from "react-router";

export function AuthDialog() {
    const [open, setOpen] = useState(false);
    const signIn = useSignIn();

    const loginForm = useForm({ defaultValues: { username: "", password: "" } });
    const registerForm = useForm({ defaultValues: { username: "", email: "", password: "" } });

    async function onLoginSubmit(values) {
        try {
            const data = await auth.login(values);
            console.log("Login response", data);
            const success = signIn({
                auth: {
                    token: data.access,
                    type: "Bearer"
                },
                userState: {
                    username: values.username
                },
                refresh: data.refresh,
            });
            if (success) {
                setOpen(false);
                toast.success("Logged in");
            }
        } catch (err) {
            console.error(err);
            loginForm.setError("password", { message: "Invalid username or password" });
        }
    }

    async function onRegisterSubmit(values) {
        try {
            await auth.register(values);
            console.log("Register response", values);
            toast.success("Registration successful! You can now log in.");
            registerForm.reset();
        } catch (err) {
            console.error(err);
            toast.error("Registration failed");
            registerForm.setError("username", { message: "Could not register user" });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Login
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Authentication</DialogTitle>
                    <DialogDescription>Log in or create an account to continue.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="login">
                    <TabsList className="mb-4">
                        <TabsTrigger value="login">Log In</TabsTrigger>
                        <TabsTrigger value="register">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <LoginForm form={loginForm} onSubmit={onLoginSubmit} />
                    </TabsContent>

                    <TabsContent value="register">
                        <RegisterForm form={registerForm} onSubmit={onRegisterSubmit} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

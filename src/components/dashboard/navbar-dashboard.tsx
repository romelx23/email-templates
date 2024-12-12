"use client";

import React from "react";
import { LogOut, Mail, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import useAuthStore from "@/features/home/store/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";


export const NavbarDashboard = () => {

    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        // Perform logout logic here (e.g., clear tokens, redirect, etc.)
        console.log("User logged out");
        router.push("/auth/login");
        logout();
    };

    console.log({ user });

    return (
        <div className="w-full z-10 flex fixed bg-black justify-between px-8 py-3 items-center">
            <Link
                href="/"
                className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">EmailThemes</span>
            </Link>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 cursor-pointer">
                            {
                                user ?
                                    <>
                                        <AvatarImage
                                            src={user.picture}
                                            alt={user.name}
                                        />
                                        <AvatarFallback
                                            className="bg-primary text-white"
                                        >{
                                                user.name?.charAt(0).toUpperCase()
                                            }</AvatarFallback>
                                    </>
                                    :
                                    <>
                                        <AvatarImage
                                            src="https://github.com/chadcn.png"
                                            alt="Chad CN"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </>
                            }

                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => {
                            router.push("/dashboard/profile");
                            console.log("Profile clicked")
                        }}>
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
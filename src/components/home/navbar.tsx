"use client";

import useAuthStore from "@/features/home/store/auth";
import { LogOut, Mail, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Loader = () => (
    <div className="flex justify-center items-center h-14">
        <div className="w-5 h-5 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
    </div>
);

const NavbarContent = () => {
    const { renew } = useAuthStore();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const pathname = usePathname();

    useEffect(() => {
        renew();
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
                <Mail className="h-6 w-6" />
                <span className="ml-2 text-lg font-bold">EmailThemes</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    Pricing
                </Link>
                {user?.email ? (
                    <div className="flex justify-center items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer">
                                    {user ? (
                                        <>
                                            <AvatarImage src={user.picture} alt={user.name} />
                                            <AvatarFallback className="bg-primary text-white">
                                                {user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </>
                                    ) : (
                                        <>
                                            <AvatarImage src="https://github.com/chadcn.png" alt="Chad CN" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </>
                                    )}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                {
                                    pathname === "/dashboard" ?
                                        <DropdownMenuItem onClick={() => {
                                            router.push("/dashboard/profile")
                                            console.log("Profile clicked")
                                        }}>
                                            <User className="h-4 w-4 mr-2" />
                                            Profile
                                        </DropdownMenuItem>
                                        :
                                        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                                            <User className="h-4 w-4 mr-2" />
                                            Dashboard
                                        </DropdownMenuItem>
                                }
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/login">
                            Login
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/register">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export const Navbar = () => {
    return (
        <Suspense fallback={<Loader />}>
            <NavbarContent />
        </Suspense>
    );
};
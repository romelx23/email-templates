"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bot, Home, LinkIcon, Plus, Settings, Users, ChevronRight, ChevronLeft, Mail } from "lucide-react";

export const SidebarDashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { icon: Home, label: "Vista General", href: "/dashboard" },
        { icon: Mail, label: "Campañas", href: "/dashboard/campaign" },
        { icon: Settings, label: "Automatización", href: "/dashboard/automatization" },
        // { icon: Users, label: "Suscripciones", href: "#" },
        // { icon: Bot, label: "AI Chatbot", href: "#" },
        // { icon: LinkIcon, label: "Integraciones", href: "#" },
    ]

    return (
        <div className={`fixed h-full z-20 md:relative md:h-[90vh]`}>
            <div className={`h-full flex overflow-hidden transition-all duration-300 ${ isOpen ? "w-64 " : "w-0 md:w-16" }`}>
                <div className={`flex flex-col border-r bg-black p-6 transition-all duration-300 ${ isOpen ? "w-64 " : "w-0 md:w-16" }`}>
                    <nav className="flex flex-1 flex-col gap-2">
                        {
                            navItems.map((item, index) => (
                                <Button key={index} variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                                    <Link href={item.href}>
                                        <item.icon className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                                        {isOpen && item.label}
                                    </Link>
                                </Button>
                            ))
                        }
                    </nav>
                </div>
                {/* <button
                    className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button> */}
                <button
                    className="fixed bottom-5 right-3 transform bg-gray-800 text-white p-2 md:p-3 shadow-md focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" /> : <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />}
                </button>
            </div>
        </div>
    );
};
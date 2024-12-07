import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bot, Home, LinkIcon, Plus, Settings, Users, ChevronRight, ChevronLeft } from "lucide-react";

export const SidebarDashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { icon: Home, label: "Vista General", href: "/dashboard" },
        { icon: Plus, label: "Crear Campaña", href: "/dashboard/campaign" },
        { icon: Settings, label: "Automatización", href: "#" },
        { icon: Users, label: "Suscripciones", href: "#" },
        { icon: Bot, label: "AI Chatbot", href: "#" },
        { icon: LinkIcon, label: "Integraciones", href: "#" },
    ]

    return (
        <div className={`relative flex ${ isOpen ? "w-64" : "w-16" } transition-all duration-300`}>
            <div className={`flex flex-col border-r bg-gray-800/25 p-6 transition-all duration-300 ${ isOpen ? "w-64" : "w-16" }`}>
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
                    {/* <Button variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                        <Link href="#">
                            <Home className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                            {isOpen && "Vista General"}
                        </Link>
                    </Button> */}
                    {/* <Button variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                        <Link href="#">
                            <Plus className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                            {isOpen && "Crear Campaña"}
                        </Link>
                    </Button>
                    <Button variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                        <Link href="#">
                            <Settings className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                            {isOpen && "Automatización"}
                        </Link>
                    </Button>
                    <Button variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                        <Link href="#">
                            <Users className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                            {isOpen && "Suscripciones"}
                        </Link>
                    </Button>
                    <Button variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                        <Link href="#">
                            <Bot className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                            {isOpen && "AI Chatbot"}
                        </Link>
                    </Button>
                    <Button variant="ghost" className={`justify-start ${ !isOpen && "justify-center" }`} asChild>
                        <Link href="#">
                            <LinkIcon className={`h-4 w-4 ${ isOpen ? "mr-2" : "" }`} />
                            {isOpen && "Integraciones"}
                        </Link>
                    </Button> */}
                </nav>
            </div>
            <button
                className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md focus:outline-none"
                onClick={toggleSidebar}
            >
                {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
        </div>
    );
};
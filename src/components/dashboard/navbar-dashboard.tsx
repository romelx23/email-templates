"use client"
import { Mail } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const NavbarDashboard = () => {
    return (
        <div className="flex justify-between px-8 py-4 items-center">
            <div className="flex items-center gap-2">
                <Mail className="h-6 w-6" />
                <span className="text-xl font-bold">EmailThemes</span>
            </div>
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/chadcn.png" alt="Chad CN" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

"use client"
import useAuthStore from '@/features/home/store/auth'
import { Info } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React from 'react'

export const Credits = () => {

    const { user } = useAuthStore();
    // const router = useRouter();

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Créditos:</span>
            <span className="text-sm font-bold">{user?.amount}</span>
            <Link
                href="/pricing"
                className="text-sm text-primary"
            >
                <Info className="h-4 w-4 text-gray-700" />
            </Link>
        </div>
    )
}

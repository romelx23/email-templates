"use client"
import useAuthStore from "@/features/home/store/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Toaster } from "sonner";

interface IDashboarLayoutProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

export const DashboarLayout: FC<IDashboarLayoutProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore();

    // console.log({ user });
    // if (!user?.email) {
    //     console.log('user not found');
    //     router.push('/auth/login');
    // }


    useEffect(() => {
        if (!isAuthenticated || !user?.email) {
            router.push("/auth/login");
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, user, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <>
            <Toaster richColors />
            <QueryClientProvider client={queryClient}>
                {
                    children
                }
            </QueryClientProvider>
        </>
    )
}

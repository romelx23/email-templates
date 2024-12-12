"use client"
import useAuthStore from "@/features/home/store/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Toaster } from "sonner";

interface IDashboarLayoutProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

export const DashboarLayout: FC<IDashboarLayoutProps> = ({ children }) => {
    const router = useRouter()
    const { user } = useAuthStore();

    console.log({ user });

    if (!user?.email) {
        console.log('user not found');
        router.push('/auth/login');
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

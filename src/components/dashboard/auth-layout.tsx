"use client"
import useAuthStore from "@/features/home/store/auth";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect } from "react"

interface IAuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayoutClient: FC<IAuthLayoutProps> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuthStore();

    console.log({ user });

    // if (user?.email) {
    //     router.push('/dashboard');
    // }

    useEffect(() => {
        if (user?.email) {
            router.push('/dashboard');
            console.log("User is logged in");
        }
    }, [user, router]);

    return (
        <Suspense fallback={<LoadingPlaceholder />}>
            {
                children
            }
        </Suspense>
    )
}

const LoadingPlaceholder: FC = () => (
    <div
        className="flex items-center justify-center h-[80vh] w-full"
        style={{ height: "80vh" }}
    >
        <p>🔄 Autenticando usuario, por favor espera...</p>
    </div>
);
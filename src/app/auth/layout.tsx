// "use client"
import { AuthLayoutClient } from '@/components/dashboard/auth-layout';
import { FooterComponent } from '@/components/home/footer';
import { Navbar } from '@/components/home/navbar';
import { FC, Suspense } from 'react';
// import useAuthStore from '@/features/home/store/auth';
// import { Mail } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    return (
        <Suspense fallback={<LoadingPlaceholder />}>
            <Navbar />
            <AuthLayoutClient>
                {children}
            </AuthLayoutClient>
            <FooterComponent />
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

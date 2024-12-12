// "use client"
import { AuthLayoutClient } from '@/components/dashboard/auth-layout';
import { FooterComponent } from '@/components/home/footer';
import { Navbar } from '@/components/home/navbar';
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
        <>
            <Navbar />
            <AuthLayoutClient>
                {children}
            </AuthLayoutClient>
            <FooterComponent />
        </>
    )
}
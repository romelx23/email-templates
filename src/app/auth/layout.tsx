import { FooterComponent } from '@/components/home/footer';
import { Navbar } from '@/components/home/navbar';
import { Mail } from 'lucide-react';
import Link from 'next/link';
// import { redirect } from 'next/navigation';

export default async function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    // const user = await getUserSession();

    // console.log({ user });

    // if (!user?.name) {
    //     console.log('user not found');
    //     redirect('/auth/login');
    // }

    return (
        <>
            <Navbar />
            {children}
            <FooterComponent />
        </>
    )
}
import { DashboarLayout } from '@/components/dashboard/dashboar-layout';
import { NavbarDashboard } from '@/components/dashboard/navbar-dashboard';
import { SidebarDashboard } from '@/components/dashboard/sidebar-dashboard';
import { FooterComponent } from '@/components/home/footer';
// import { Navbar } from '@/components/home/navbar';
// import useAuthStore from '@/features/home/store/auth';
// import { Mail } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { redirect } from 'next/navigation';

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    // const user = await getUserSession();

    return (
        <>
            <NavbarDashboard />
            <div className="flex min-h-[80vh] pt-14 ">
                <SidebarDashboard />
                <div className="px-2 md:px-8">
                    <DashboarLayout>
                        {children}
                    </DashboarLayout>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}
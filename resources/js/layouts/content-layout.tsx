import { ContentSidebar } from '@/components/app/sidebar/content-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserModel } from '@/lib/types';
import { Head, Link } from '@inertiajs/react';
import { Home, PanelLeftIcon } from 'lucide-react';

interface ContentLayoutProps {
    user: UserModel;
    children: React.ReactNode;
}

export function ContentLayout({ user, children }: ContentLayoutProps) {
    const role = user.role;

    return (
        <SidebarProvider>
            <ContentSidebar />
            {/* <ContentSidebar role={role} /> */}
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}

import { ContentSidebar } from '@/components/app/sidebar/content-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ContentSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
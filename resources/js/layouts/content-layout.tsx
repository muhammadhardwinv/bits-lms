import { ContentSidebar } from '@/components/app/sidebar/content-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Home, PanelLeftIcon } from 'lucide-react';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ContentSidebar />
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
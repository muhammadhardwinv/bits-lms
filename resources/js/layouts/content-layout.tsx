import { ContentSidebar } from '@/components/app/sidebar/content-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Home, PanelLeftIcon } from 'lucide-react';

interface ContentLayoutProps {
    children: React.ReactNode;
    role: string;
}

export function ContentLayout({ children, role }: ContentLayoutProps) {
    return (
        <SidebarProvider>
            <ContentSidebar role={role} />
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}

export function StudentLayout({ children }: { children: React.ReactNode }) {
    return <ContentLayout role={'student'}>{children}</ContentLayout>;
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
    return <ContentLayout role={'admin'}>{children}</ContentLayout>;
}

export function TeacherLayout({ children }: { children: React.ReactNode }) {
    return <ContentLayout role={'teacher'}>{children}</ContentLayout>;
}
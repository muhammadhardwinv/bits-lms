import { ContentSidebar } from '@/components/app/sidebar/content-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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

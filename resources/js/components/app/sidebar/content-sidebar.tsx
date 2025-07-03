import { BarChart, Calendar, ChevronUp, ClipboardList, Group, LayoutDashboardIcon, Library, User2 } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
// import TopSidebar from './top-sidebar';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { title } from 'process';

const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon,
    },
    {
        title: 'Courses',
        url: '/courses',
        icon: Library,
    },
    {
        title: 'Assignment',
        url: '/assignment',
        icon: ClipboardList,
    },
    {
        title: 'Grade Books',
        url: '/grade-books',
        icon: BarChart,
    },
    {
        title: 'Events',
        url: '/events',
        icon: Calendar,
    },
];

export function ContentSidebar() {
    return (
        <Sidebar>
            <div className="font-weight-900 flex items-center text-3xl">
                <img className="m-2 flex h-12 w-12 items-center justify-center" src="/assets/logo-bits.png" alt="" />
                <h2 className="items-center text-3xl font-semibold text-gray-800 dark:text-gray-100">BITS</h2>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Michael
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            {/* <UserSidebar name="Chris" studentID="2525252A" /> */}
        </Sidebar>
    );
}

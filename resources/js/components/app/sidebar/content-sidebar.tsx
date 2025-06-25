import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from 'lucide-react';

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

const items = [
    {
        title: 'Dashboard',
        url: 'dashboard',
        icon: Home,
    },
    {
        title: 'Courses',
        url: 'courses',
        icon: Inbox,
    },
    {
        title: 'Forums',
        url: '#',
        icon: Search,
    },
    {
        title: 'Evaluations',
        url: '#',
        icon: Settings,
    },
    {
        title: 'Events',
        url: '#',
        icon: Calendar,
    },
];

export function ContentSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* <TopSidebar /> */}
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
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
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

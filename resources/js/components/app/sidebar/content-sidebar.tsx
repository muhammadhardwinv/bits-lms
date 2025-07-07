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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useUserStore } from '@/lib/store/userStore';

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
        url: '/gradebook',
        icon: BarChart,
    },
    {
        title: 'Events',
        url: '/events',
        icon: Calendar,
    },
];
export function ContentSidebar() {
    const { role, setRole } = useUserStore();

    return (
        <Sidebar>
            <div className="font-weight-900 flex items-center text-3xl">
                <img className="m-2 flex h-12 w-12 items-center justify-center" src="/assets/logo-bits.png" alt="" />
                <h2 className="mt-1 items-center text-3xl font-semibold text-gray-800 dark:text-gray-100">BITS</h2>
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
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => setRole('student')}
                                    className={role === 'student' ? 'font-semibold text-blue-600' : ''}
                                >
                                    Student
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setRole('lecturer')}
                                    className={role === 'lecturer' ? 'font-semibold text-blue-600' : ''}
                                >
                                    Lecturer
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    {/* <span>Sign out</span> */}
                                    <Link href="/login" className="text-red-500 hover:underline">
                                        Sign out
                                    </Link>
                                    {/* <link href="login">Sign out</link> */}
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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useUserStore } from '@/lib/store/userStore';
import { Link } from '@inertiajs/react';
import { BarChart, Calendar, ChevronUp, ClipboardList, LayoutDashboardIcon, Library, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const items = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
    { title: 'Courses', url: '/courses', icon: Library },
    { title: 'Assignment', url: '/assignment', icon: ClipboardList },
    { title: 'Grade Books', url: '/gradebook', icon: BarChart },
    { title: 'Events', url: '/events', icon: Calendar },
];

export function ContentSidebar() {
    const { role, setRole } = useUserStore();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const dark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(dark);
        if (dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, []);

    const toggleDarkMode = () => {
        const html = document.documentElement;
        const nowDark = html.classList.toggle('dark');
        localStorage.setItem('theme', nowDark ? 'dark' : 'light');
        setIsDark(nowDark);
    };

    return (
        <Sidebar>
            <div className="font-weight-900 flex items-center justify-between px-2 py-2 text-3xl">
                <div className="flex items-center gap-2">
                    <img className="h-12 w-12" src="/assets/logo-bits.png" alt="BITS Logo" />
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">BITS</h2>
                </div>
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
                                    <Link href="/login" className="text-red-500 hover:underline">
                                        Sign out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

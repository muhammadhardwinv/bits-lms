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
import { AdminNavItems, StudentNavItems, TeacherNavItems } from '@/lib/navigationItem';
// import { useUserStore } from '@/lib/store/userStore';
import { Link, usePage } from '@inertiajs/react';
import { BarChart, Calendar, ChevronUp, ClipboardList, Ellipsis, LayoutDashboardIcon, Library, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// const items = [
//     { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
//     { title: 'Courses', url: '/courses', icon: Library },
//     { title: 'Assignment', url: '/assignment', icon: ClipboardList },
//     { title: 'Grade Books', url: '/gradebook', icon: BarChart },
//     { title: 'Events', url: '/events', icon: Calendar },
// ];

function toCamelCase(str: string | undefined): string {
    if (!str) return 'Unknown';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function ContentSidebar({ role }: { role: string }) {
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


    const navItems = role === 'admin' ? AdminNavItems : role === 'teacher' ? TeacherNavItems : StudentNavItems;

    return (
        <Sidebar className="">
            <div className="font-weight-900 flex items-center justify-between bg-[#0397DA] px-3 py-2 text-3xl dark:bg-[#0397DA]">
                <div className="flex items-center gap-2">
                    <img className="h-12 w-12" src="/assets/logo-bits.png" alt="BITS Logo" />
                    <h2 className="text-3xl font-semibold text-gray-800 text-white dark:text-black">BITS</h2>
                </div>
            </div>

            <DropdownMenu>
                {/* Card with Ellipsis inside */}
                <div className="bg-[#0397DA]">
                    <div className="relative mx-2 my-2 h-[20vh] rounded bg-[#066a9a] p-3 text-sm text-white">
                        {/* Ellipsis Icon - Top Right */}
                        <DropdownMenuTrigger asChild>
                            <button className="absolute top-2 right-2 cursor-pointer rounded-full p-1 transition hover:bg-[#F2951B]">
                                <Ellipsis className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>

                        {/* Card Content */}
                        <div className="flex h-[15vh] flex-col justify-between">
                            <span className="text-md block">Role:</span>
                            <span className="mt-1 block font-semibold">{toCamelCase(role)}</span>
                        </div>
                    </div>
                </div>

                {/* Dropdown Content */}
                <DropdownMenuContent side="right" align="center" className="w-44">
                    <DropdownMenuItem asChild>
                        <Link href="/login" className="hover:text-black-200 cursor-pointer text-red-500">
                            Sign out
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SidebarContent className="bg-[#0397DA] font-black text-white dark:font-black">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {role == 'admin'
                                ? AdminNavItems.map((item) => (
                                      <SidebarMenuItem key={item.title}>
                                          <SidebarMenuButton asChild>
                                              <a href={item.url}>
                                                  <item.icon />
                                                  <span>{item.title}</span>
                                              </a>
                                          </SidebarMenuButton>
                                      </SidebarMenuItem>
                                  ))
                                : role == 'teacher'
                                  ? TeacherNavItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                  : StudentNavItems.map((item) => (
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
        </Sidebar>
    );
}

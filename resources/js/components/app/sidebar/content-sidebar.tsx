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
import { useUserStore } from '@/lib/store/userStore';
import { usePage, router, Link } from '@inertiajs/react';
import { BarChart, Calendar, ChevronUp, ClipboardList, Ellipsis, LayoutDashboardIcon, Library, User2, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PageProps {
    auth: {
        user: AuthUser;
    };
    [key: string]: any;
}
function toCamelCase(str: string | undefined): string {
    if (!str) return 'Unknown';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function ContentSidebar() {
    const { role } = useUserStore();
    const { auth } = usePage<PageProps>().props;
    const [isDark, setIsDark] = useState(false);

    // Get the actual user role from the database
    const actualUserRole = auth?.user?.role || role;

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const dark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, []);

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
            onError: (errors) => {
                console.error('Logout failed:', errors);
            }
        });
    };

    return (
        <Sidebar className="">
            <div className="font-weight-900 flex items-center justify-between bg-[#0397DA] px-3 py-2 text-3xl dark:bg-[#0397DA]">
                <div className="flex items-center gap-2">
                    <img className="h-12 w-12" src="/assets/logo-bits.png" alt="BITS Logo" />
                    <h2 className="text-3xl font-semibold text-gray-800 text-white dark:text-white">BITS</h2>
                </div>
            </div>

            <DropdownMenu>
                <div className="bg-[#0397DA]">
                    <div className="relative mx-2 my-2 h-[20vh] rounded bg-[#066a9a] p-3 text-sm text-white">
                        <DropdownMenuTrigger asChild>
                            <button className="absolute top-2 right-2 cursor-pointer rounded-full p-1 transition hover:bg-[#014769]">
                                <Ellipsis className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>

                        <div className="flex h-[15vh] flex-col justify-between">
                            <span className="text-md block">Role:</span>
                            <span className="mt-1 block font-semibold">{toCamelCase(actualUserRole)}</span>
                        </div>
                    </div>
                </div>

                <DropdownMenuContent side="right" align="center" className="w-44">
                    <DropdownMenuLabel className="text-xs text-muted-foreground">User Menu</DropdownMenuLabel>
                    <DropdownMenuItem disabled className="font-semibold text-blue-600">
                        {toCamelCase(actualUserRole)} Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-700 cursor-pointer">
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SidebarContent className="bg-[#0397DA] font-black text-white dark:font-black">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {actualUserRole == 'admin'
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
                                : actualUserRole == 'teacher'
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
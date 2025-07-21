import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { User } from '@/types';
import {
    BookOpen,
    Users,
    FileText,
    GraduationCap,
    MessageSquare,
    TrendingUp,
    Bell,
    Plus,
    Calendar,
    BarChart3,
    CheckCircle,
    LogOut,
    Settings,
    Shield,
    Database,
} from 'lucide-react';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';

interface AdminDashboardProps {
    auth: {
        user: UserModel;
    };
    [key: string]: any;
}

export function AdminControlButton() {
    const deleteOption = [{ key: 'X', label: 'Delete post' }];

    return (
        <div className="text-bold text-md flex flex-row gap-8">
            {deleteOption.map((opt) => (
                <div key={opt.key} className="group relative inline-block">
                    <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-red-500 text-center hover:bg-red-500 hover:text-white">
                        {opt.key}
                    </div>
                    <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                        {opt.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AdminDashboard() {
    const { auth } = usePage<AdminDashboardProps>().props;

    const handleLogout = () => {
        router.post(
            route('logout'),
            {},
            {
                onSuccess: () => {
                    // Redirect will be handled by the controller
                },
                onError: (errors) => {
                    console.error('Logout failed:', errors);
                },
            },
        );
    };

    // Mock data for admin dashboard
    const systemStats = [
        { id: 1, label: 'Total Users', value: 1250, change: '+12%', color: 'text-blue-600' },
        { id: 2, label: 'Active Courses', value: 45, change: '+5%', color: 'text-green-600' },
        { id: 3, label: 'Total Assignments', value: 320, change: '+8%', color: 'text-purple-600' },
        { id: 4, label: 'System Uptime', value: '99.9%', change: 'Stable', color: 'text-emerald-600' },
    ];

    const recentActivity = [
        { id: 1, user: 'Dosen: Prof. Rudi Santoso', action: 'Online' },
        { id: 2, user: 'Student: Ahmad Fadhlurrahman', action: 'Away' },
        { id: 3, user: 'Admin C', action: 'Tambah user baru - Siti Nurhaliza' },
        { id: 4, user: 'Dosen: Dr. Lina Agustina', action: 'Online' },
        { id: 5, user: 'Student: Budi Prasetyo', action: 'Online' },
        { id: 6, user: 'Student: Citra Melati', action: 'Away' },
        { id: 7, user: 'Ir. Bambang Sutrisno', action: 'Online' },
    ];

    const pendingApprovals = [
        { id: 1, type: 'course', title: 'Machine Learning Fundamentals', requester: 'Dr. Smith', date: '2025-07-08' },
        { id: 2, type: 'user', title: 'Teacher Account Request', requester: 'Prof. Wilson', date: '2025-07-07' },
        { id: 3, type: 'resource', title: 'Library Access Request', requester: 'Student Union', date: '2025-07-06' },
    ];

    const handleAddUser = () => {
        router.get(route('admin.users.create'));
    };

    const handleAddMaterials = () => {
        router.visit(route('admin.add.materials'));
    };

    return (
        <>
            <Head title="Admin Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-orange-400 p-6 text-white">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="mb-2 text-2xl font-bold">Welcome back, Admin {auth.user.name}!</h1>
                                <p className="text-red-100">Manage and oversee the entire learning management system</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-row items-center justify-center">
                            <Card className="group relative h-[36vh] w-[36vw] cursor-pointer overflow-hidden p-0">
                                <Button
                                    onClick={handleAddUser}
                                    className="transition-all-text-xs h-full w-full rounded-none bg-gray-200 text-lg text-black hover:bg-[#F1911A] hover:text-white"
                                >
                                    + Add New User
                                </Button>
                            </Card>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center">
                            <Card className="group relative h-[36vh] w-[36vw] cursor-pointer overflow-hidden p-0">
                                <Button
                                    onClick={handleAddMaterials}
                                    className="transition-all-text-xs h-full w-full items-center justify-center rounded-none bg-gray-200 text-center text-lg text-black hover:bg-[#F1911A] hover:text-white"
                                >
                                    + Add New Materials
                                </Button>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {/* <EventSlideshow /> */}
                        {/* Recent Activity */}
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrative Tools</CardTitle>
                            <CardDescription>Quick access to system management functions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Button variant="outline" className="w-full">
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Users
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Manage Courses
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Settings className="mr-2 h-4 w-4" />
                                    System Settings
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Reports
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Security
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Database className="mr-2 h-4 w-4" />
                                    Database
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Announcements
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Backup System
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ContentLayout>
        </>
    );
}

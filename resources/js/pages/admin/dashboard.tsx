import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContentLayout from '@/layouts/content-layout';
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
    Database
} from 'lucide-react';

interface AdminDashboardProps {
    auth: {
        user: User;
    };
}

export default function AdminDashboard() {
    const { auth } = usePage<AdminDashboardProps>().props;

    const handleLogout = () => {
        router.post(route('logout'), {}, {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
            onError: (errors) => {
                console.error('Logout failed:', errors);
            }
        });
    };

    // Mock data for admin dashboard
    const systemStats = [
        { id: 1, label: 'Total Users', value: 1250, change: '+12%', color: 'text-blue-600' },
        { id: 2, label: 'Active Courses', value: 45, change: '+5%', color: 'text-green-600' },
        { id: 3, label: 'Total Assignments', value: 320, change: '+8%', color: 'text-purple-600' },
        { id: 4, label: 'System Uptime', value: '99.9%', change: 'Stable', color: 'text-emerald-600' },
    ];

    const recentActivity = [
        { id: 1, type: 'user_registration', user: 'John Smith', action: 'New user registered', time: '2 hours ago' },
        { id: 2, type: 'course_creation', user: 'Dr. Johnson', action: 'Created new course: Advanced Physics', time: '4 hours ago' },
        { id: 3, type: 'system_update', user: 'System', action: 'Database backup completed', time: '6 hours ago' },
        { id: 4, type: 'user_issue', user: 'Jane Doe', action: 'Reported login issue', time: '8 hours ago' },
    ];

    const pendingApprovals = [
        { id: 1, type: 'course', title: 'Machine Learning Fundamentals', requester: 'Dr. Smith', date: '2025-07-08' },
        { id: 2, type: 'user', title: 'Teacher Account Request', requester: 'Prof. Wilson', date: '2025-07-07' },
        { id: 3, type: 'resource', title: 'Library Access Request', requester: 'Student Union', date: '2025-07-06' },
    ];

    return (
        <>
            <Head title="Admin Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">Welcome back, Admin {auth.user.name}!</h1>
                                <p className="text-red-100">Manage and oversee the entire learning management system</p>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleLogout}
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* System Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {systemStats.map((stat) => (
                            <Card key={stat.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                        <div className={`text-sm ${stat.color}`}>
                                            {stat.change}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5" />
                                    <span>Recent Activity</span>
                                </CardTitle>
                                <CardDescription>Latest system activities and user actions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex justify-between items-start border-b pb-3">
                                            <div>
                                                <h3 className="font-semibold">{activity.user}</h3>
                                                <p className="text-sm text-gray-600">{activity.action}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {activity.type.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Approvals */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Pending Approvals</span>
                                </CardTitle>
                                <CardDescription>Items requiring administrative approval</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pendingApprovals.map((item) => (
                                        <div key={item.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    <p className="text-sm text-gray-600">Requested by: {item.requester}</p>
                                                    <p className="text-xs text-gray-500">{item.date}</p>
                                                </div>
                                                <Badge variant="outline">{item.type}</Badge>
                                            </div>
                                            <div className="flex space-x-2 mt-3">
                                                <Button variant="outline" size="sm" className="text-green-600">
                                                    Approve
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-red-600">
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrative Tools</CardTitle>
                            <CardDescription>Quick access to system management functions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Button variant="outline" className="w-full">
                                    <Users className="h-4 w-4 mr-2" />
                                    Manage Users
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Manage Courses
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Settings className="h-4 w-4 mr-2" />
                                    System Settings
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Reports
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Security
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Database className="h-4 w-4 mr-2" />
                                    Database
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Bell className="h-4 w-4 mr-2" />
                                    Announcements
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Plus className="h-4 w-4 mr-2" />
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

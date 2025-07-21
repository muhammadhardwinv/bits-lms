import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { BookOpen, Users, FileText, Calendar, Clock, GraduationCap, MessageSquare, TrendingUp, Bell, LogOut, Plus } from 'lucide-react';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';

interface TeacherDashboardProps {
    auth: {
        user: UserModel;
    };
    [key: string]: any;
}

export default function TeacherDashboard() {
    const { auth } = usePage<TeacherDashboardProps>().props;

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

    // Mock data for teacher dashboard
    const teachingCourses = [
        { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', students: 45, assignments: 8 },
        { id: 2, name: 'Database Systems', code: 'CS301', students: 32, assignments: 6 },
        { id: 3, name: 'Web Development', code: 'CS250', students: 38, assignments: 10 },
    ];

    const pendingGrading = [
        { id: 1, assignment: 'Midterm Exam', course: 'CS101', submissions: 45, graded: 30 },
        { id: 2, assignment: 'Lab Assignment 4', course: 'CS301', submissions: 32, graded: 25 },
        { id: 3, assignment: 'Final Project', course: 'CS250', submissions: 38, graded: 15 },
    ];

    const upcomingClasses = [
        { id: 1, course: 'CS101', time: '09:00 AM', room: 'Room 201', date: 'Today' },
        { id: 2, course: 'CS301', time: '02:00 PM', room: 'Lab 105', date: 'Today' },
        { id: 3, course: 'CS250', time: '10:00 AM', room: 'Room 303', date: 'Tomorrow' },
    ];

    return (
        <>
            <Head title="Teacher Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="rounded-lg bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="mb-2 text-2xl font-bold">Welcome back, Professor {auth.user.name}!</h1>
                                <p className="text-green-100">Ready to inspire and educate your students?</p>
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

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-green-100 p-2">
                                        <BookOpen className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{teachingCourses.length}</p>
                                        <p className="text-sm text-gray-600">Teaching Courses</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-blue-100 p-2">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{teachingCourses.reduce((sum, course) => sum + course.students, 0)}</p>
                                        <p className="text-sm text-gray-600">Total Students</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-orange-100 p-2">
                                        <FileText className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {pendingGrading.reduce((sum, item) => sum + (item.submissions - item.graded), 0)}
                                        </p>
                                        <p className="text-sm text-gray-600">Pending Grading</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-purple-100 p-2">
                                        <Calendar className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{upcomingClasses.length}</p>
                                        <p className="text-sm text-gray-600">Today's Classes</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Teaching Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>My Courses</span>
                                </CardTitle>
                                <CardDescription>Courses you're currently teaching</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {teachingCourses.map((course) => (
                                        <div key={course.id} className="rounded-lg border p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{course.name}</h3>
                                                    <p className="text-sm text-gray-600">{course.code}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">{course.students} students</p>
                                                    <p className="text-sm text-gray-500">{course.assignments} assignments</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    View Course
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Plus className="mr-1 h-4 w-4" />
                                                    New Assignment
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Grading */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Pending Grading</span>
                                </CardTitle>
                                <CardDescription>Assignments waiting for your review</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pendingGrading.map((item) => (
                                        <div key={item.id} className="rounded-lg border p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{item.assignment}</h3>
                                                    <p className="text-sm text-gray-600">{item.course}</p>
                                                </div>
                                                <Badge variant="outline">
                                                    {item.graded}/{item.submissions}
                                                </Badge>
                                            </div>
                                            <div className="mb-3 h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-green-600"
                                                    style={{ width: `${(item.graded / item.submissions) * 100}%` }}
                                                ></div>
                                            </div>
                                            <Button variant="outline" size="sm" className="w-full">
                                                Continue Grading
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Upcoming Classes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>Upcoming Classes</span>
                            </CardTitle>
                            <CardDescription>Your schedule for today and tomorrow</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {upcomingClasses.map((classItem) => (
                                    <div key={classItem.id} className="rounded-lg border p-4">
                                        <div className="mb-2 flex items-start justify-between">
                                            <h3 className="font-semibold">{classItem.course}</h3>
                                            <Badge variant={classItem.date === 'Today' ? 'default' : 'secondary'}>{classItem.date}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">{classItem.time}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <GraduationCap className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">{classItem.room}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common teaching tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Link href="/courses">
                                    <Button variant="outline" className="w-full">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Manage Courses
                                    </Button>
                                </Link>
                                <Link href="/gradebook">
                                    <Button variant="outline" className="w-full">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Gradebook
                                    </Button>
                                </Link>
                                <Link href="/people">
                                    <Button variant="outline" className="w-full">
                                        <Users className="mr-2 h-4 w-4" />
                                        Students
                                    </Button>
                                </Link>
                                <Link href="/select-class">
                                    <Button variant="outline" className="w-full">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Assignment
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ContentLayout>
        </>
    );
}

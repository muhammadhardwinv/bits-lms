import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { BookOpen, Calendar, Clock, FileText, GraduationCap, MessageSquare, TrendingUp, Bell, LogOut } from 'lucide-react';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';

interface StudentDashboardProps {
    auth: {
        user: UserModel;
    };
    [key: string]: any;
}

export default function StudentDashboard() {
    const { auth } = usePage<StudentDashboardProps>().props;

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

    // Mock data for student dashboard
    const enrolledCourses = [
        { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', progress: 75, instructor: 'Dr. Smith' },
        { id: 2, name: 'Mathematics for Computing', code: 'MATH201', progress: 60, instructor: 'Prof. Johnson' },
        { id: 3, name: 'Database Systems', code: 'CS301', progress: 85, instructor: 'Dr. Brown' },
        { id: 4, name: 'Web Development', code: 'CS250', progress: 90, instructor: 'Ms. Davis' },
    ];

    const upcomingAssignments = [
        { id: 1, title: 'Algorithm Analysis Report', course: 'CS101', dueDate: '2025-07-15', status: 'pending' },
        { id: 2, title: 'Database Design Project', course: 'CS301', dueDate: '2025-07-18', status: 'in-progress' },
        { id: 3, title: 'Calculus Problem Set 5', course: 'MATH201', dueDate: '2025-07-20', status: 'pending' },
    ];

    const recentGrades = [
        { id: 1, assignment: 'Midterm Exam', course: 'CS101', grade: 'A-', points: '87/100' },
        { id: 2, assignment: 'Lab Assignment 3', course: 'CS301', grade: 'B+', points: '85/100' },
        { id: 3, assignment: 'Quiz 4', course: 'MATH201', grade: 'A', points: '95/100' },
    ];

    return (
        <>
            <Head title="Student Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                        <div className="flex items-start justify-between">
                            <div>
                                {/* <h1 className="text-2xl font-bold mb-2">Welcome back, {auth.user.name}!</h1> */}
                                <p className="text-blue-100">Ready to continue your learning journey?</p>
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
                                    <div className="rounded-lg bg-blue-100 p-2">
                                        <BookOpen className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                                        <p className="text-sm text-gray-600">Enrolled Courses</p>
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
                                        <p className="text-2xl font-bold">{upcomingAssignments.length}</p>
                                        <p className="text-sm text-gray-600">Pending Assignments</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-green-100 p-2">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">3.7</p>
                                        <p className="text-sm text-gray-600">Current GPA</p>
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
                                        <p className="text-2xl font-bold">5</p>
                                        <p className="text-sm text-gray-600">This Week's Classes</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Enrolled Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>My Courses</span>
                                </CardTitle>
                                <CardDescription>Your enrolled courses and progress</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {enrolledCourses.map((course) => (
                                        <div key={course.id} className="rounded-lg border p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{course.name}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {course.code} • {course.instructor}
                                                    </p>
                                                </div>
                                                <Badge variant="outline">{course.progress}%</Badge>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Assignments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Upcoming Assignments</span>
                                </CardTitle>
                                <CardDescription>Assignments due soon</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingAssignments.map((assignment) => (
                                        <div key={assignment.id} className="rounded-lg border p-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{assignment.title}</h3>
                                                    <p className="text-sm text-gray-600">{assignment.course}</p>
                                                    <div className="mt-2 flex items-center space-x-2">
                                                        <Clock className="h-4 w-4 text-gray-500" />
                                                        <span className="text-sm text-gray-500">Due: {assignment.dueDate}</span>
                                                    </div>
                                                </div>
                                                <Badge variant={assignment.status === 'in-progress' ? 'default' : 'secondary'}>
                                                    {assignment.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Grades */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <GraduationCap className="h-5 w-5" />
                                <span>Recent Grades</span>
                            </CardTitle>
                            <CardDescription>Your latest assignment and exam results</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {recentGrades.map((grade) => (
                                    <div key={grade.id} className="rounded-lg border p-4">
                                        <h3 className="font-semibold">{grade.assignment}</h3>
                                        <p className="text-sm text-gray-600">{grade.course}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <Badge variant="outline">{grade.grade}</Badge>
                                            <span className="text-sm text-gray-500">{grade.points}</span>
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
                            <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Link href="/courses">
                                    <Button variant="outline" className="w-full">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        View Courses
                                    </Button>
                                </Link>
                                <Link href="/assignment">
                                    <Button variant="outline" className="w-full">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Assignments
                                    </Button>
                                </Link>
                                <Link href="/discussion">
                                    <Button variant="outline" className="w-full">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Discussions
                                    </Button>
                                </Link>
                                <Link href="/events">
                                    <Button variant="outline" className="w-full">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Events
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

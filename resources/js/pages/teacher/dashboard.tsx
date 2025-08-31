import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    BookOpen,
    Users,
    FileText,
    Calendar,
    Clock,
    GraduationCap,
    MessageSquare,
    TrendingUp,
    Bell,
    LogOut,
    Plus,
    Book,
    BookOpenText,
    CrossIcon,
    Cross,
} from 'lucide-react';
import { ContentLayout } from '@/layouts/content-layout';
import { CourseModel, UserModel } from '@/lib/types';
import { teachers } from '../../lib/schoolData';

interface TeacherDashboardProps {
    auth: {
        user: UserModel;
    };
    allCourse: CourseModel[];
    [key: string]: any;
}

export default function TeacherDashboard() {
    const { auth, allCourse } = usePage<TeacherDashboardProps>().props;
    const role = auth.user.role;
    const teacherCourses = allCourse.filter((course) => course.teacher_id === auth.user.id);

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

    const availableCourse = [
        { id: 1, assignment: 'Midterm Exam', course: 'CS101', submissions: 45, graded: 25 },
        { id: 2, assignment: 'Lab Assignment 4', course: 'CS301', submissions: 32, graded: 28 },
        { id: 3, assignment: 'Final Project', course: 'CS250', submissions: 38, graded: 11 },
    ];

    const today = new Date();
    const upcomingClasses = allCourse
        .filter((course) => course.created_at)
        .filter((course) => {
            const endDate = new Date(course.created_at!);
            endDate.setDate(endDate.getDate() + 7);
            return endDate >= today;
        });

    const sortedCourse = upcomingClasses.sort((a, b) => {
        const aDate = new Date(a.created_at!);
        const bDate = new Date(b.created_at!);
        return aDate.getTime() - bDate.getTime();
    });

    const totalStudents = upcomingClasses.reduce((sum, course) => sum + (course.max_students ?? 0), 0);
    const totalCapacity = upcomingClasses.reduce((sum, course) => sum + (course.max_students ?? 0), 0);

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
                                <h1 className="text-2xl font-bold">Welcome back, Professor {auth.user.name}!</h1>
                                <h1 className="mb-2 text-lg font-bold">Teacher Code: {auth.user.id}!</h1>
                                {/* <h1 className="mb-2 text-2xl font-bold">
                                    Welcome back, Professor {auth.user.name} {auth.user.id}!
                                </h1> */}
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
                    <div className="mx-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card className="dark:bg-[#1c1c1c]">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-green-100 p-2 dark:bg-green-800">
                                        <BookOpen className="h-6 w-6 text-green-600 dark:text-green-100" />
                                    </div>
                                    <div>
                                        {/* <p className="text-2xl font-bold">{teachingCourses.length}</p> */}
                                        <p className="text-2xl font-bold">{allCourse?.length ?? 0}</p>

                                        <p className="text-sm text-gray-600">Teaching Courses</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-[#1c1c1c]">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-blue-100 p-2">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-2xl font-bold">
                                            {upcomingClasses.reduce((sum, course) => sum + (course.max_students ?? 0), 0)} /{' '}
                                            {upcomingClasses.reduce((sum, course) => sum + (course.max_students ?? 0), 0)}
                                        </p>
                                        <p className="text-sm text-gray-600"> Total Students in Class </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="dark:bg-[#1c1c1c]">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-orange-100 p-2">
                                        <FileText className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {availableCourse.reduce((sum, item) => sum + (item.submissions - item.graded), 0)}
                                        </p>
                                        <p className="text-sm text-gray-600">Available Courses</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-[#1c1c1c]">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-purple-100 p-2">
                                        <Calendar className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{upcomingClasses.length}</p>
                                        <p className="text-sm text-gray-600">Upcoming's Classes</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mx-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Teaching Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpenText className="h-6 w-6 space-x-2" />
                                    <span className="text-2xl">Teaching Courses</span>
                                </CardTitle>
                                <CardDescription>Courses you're currently teaching</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4">
                                    {allCourse && allCourse.length > 0 ? (
                                        allCourse.map((course: any) => (
                                            <div key={course.id} className="relative">
                                                <Card
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => router.visit(`/sessions/${course.id}`)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            console.log('Course clicked by keyboard');
                                                            router.visit(`/sessions/${course.id}`);
                                                        }
                                                    }}
                                                    className="flex h-full w-full cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none dark:bg-[#1c1c1c]"
                                                >
                                                    <CardContent className="flex h-full flex-col justify-between">
                                                        <div className="relative flex flex-col rounded-xl transition-transform duration-200 hover:-translate-y-1 dark:border-gray-700">
                                                            {/* Credit Badge */}
                                                            <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-[#F2951B] to-[#ecad5b] px-3 py-1 text-xs font-semibold text-white shadow-md">
                                                                {course.credits} Credits
                                                            </span>

                                                            {/* Course Info */}
                                                            <div className="flex flex-col gap-2">
                                                                <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                                                                    {course.name}
                                                                </h3>
                                                                <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                                                                    {course.description}
                                                                </p>
                                                                <div className="flex flex-row gap-4">
                                                                    <p className="mt-2 text-xs text-gray-500">
                                                                        Listed at:{' '}
                                                                        {new Date(course.created_at).toLocaleDateString('en-US', {
                                                                            month: 'short', // "Aug"
                                                                            day: '2-digit', // "27"
                                                                            year: 'numeric', // "2025"
                                                                        })}
                                                                    </p>
                                                                    <p className="mt-2 text-xs text-gray-500">
                                                                        Ended at:{' '}
                                                                        {new Date(
                                                                            new Date(course.created_at).setDate(
                                                                                new Date(course.created_at).getDate() + 7,
                                                                            ),
                                                                        ).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: '2-digit',
                                                                            year: 'numeric',
                                                                        })}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 dark:text-gray-400">No courses found.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Grading */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span className="text-2xl">Available Course</span>
                                </CardTitle>
                                <CardDescription>Available courses you might take</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {availableCourse.map((item, index) => (
                                        <Card
                                            key={item.id}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => console.log(`clicked available course ${index + 1}`)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    router.visit(`/grading/${item.id}`);
                                                }
                                            }}
                                            className="flex h-full w-full cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#1c1c1c] hover:dark:shadow-lg"
                                        >
                                            <CardContent className="flex h-full flex-col justify-between">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.assignment}</h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.course}</p>
                                                    </div>
                                                    <Badge variant="outline">
                                                        {item.graded}/{item.submissions}
                                                    </Badge>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="my-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                                    <div
                                                        className="h-2 rounded-full bg-gradient-to-r from-[#F2951B] to-[#ecad5b]"
                                                        style={{
                                                            width: `${(item.graded / item.submissions) * 100}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Upcoming Classes */}
                    <Card className="mx-4 rounded-xl border border-gray-200 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
                        {/* Header */}
                        <CardHeader>
                            <CardTitle className="mx-2 flex flex-col items-start">
                                <div className="flex flex-row items-center space-x-2">
                                    <Calendar className="h-6 w-6 text-black" />
                                    <span className="text-2xl font-semibold text-gray-900 dark:text-white"> Upcoming Classes</span>
                                </div>
                                <span className="text-xs font-normal"> Your schedule for today and tomorrow</span>
                            </CardTitle>
                        </CardHeader>

                        {/* Main Content */}
                        <CardContent className="px-4">
                            <div className="flex flex-row items-center">
                                <p className="ml-4 text-lg font-bold text-gray-900 dark:text-white">Today's Class:</p>
                            </div>
                            {/* Next Upcoming Class */}
                            {sortedCourse.length > 0 && (
                                <div className="mt-4 ml-4 cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-[#1c1c1c]">
                                    <div className="flex flex-row items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sortedCourse[0].name}</h3>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {sortedCourse[0].max_students ?? 0} / {sortedCourse[0].max_students ?? 0} Students
                                        </span>
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{sortedCourse[0].description}</p>
                                    <div className="mt-2 flex flex-row gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span>
                                            Listed at:{' '}
                                            {sortedCourse[0].created_at
                                                ? new Date(sortedCourse[0].created_at).toLocaleDateString('en-US', {
                                                      month: 'short',
                                                      day: '2-digit',
                                                      year: 'numeric',
                                                  })
                                                : 'N/A'}
                                        </span>
                                        <span>
                                            Ends at:{' '}
                                            {sortedCourse[0].created_at
                                                ? new Date(
                                                      new Date(sortedCourse[0].created_at).setDate(
                                                          new Date(sortedCourse[0].created_at).getDate() + 7,
                                                      ),
                                                  ).toLocaleDateString('en-US', {
                                                      month: 'short',
                                                      day: '2-digit',
                                                      year: 'numeric',
                                                  })
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="m-4 px-4 shadow-md hover:shadow-lg">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common teaching tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Link href="/courses">
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-[#1c1c1c]"
                                    >
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Manage Courses
                                    </Button>
                                </Link>

                                <Link href="/gradebook">
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-[#1c1c1c]"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        Gradebook
                                    </Button>
                                </Link>

                                <Link href="/classroom">
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-[#1c1c1c]"
                                    >
                                        <Users className="mr-2 h-4 w-4" />
                                        Classrooms
                                    </Button>
                                </Link>

                                <Link href="/assignment.create">
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-[#1c1c1c]"
                                    >
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

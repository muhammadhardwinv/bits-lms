import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AssignmentsModel, CourseModel, UserModel } from '@/lib/types';
import { Link, router } from '@inertiajs/react';
import { ClipboardList, LucideIcon, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PageProps {
    auth: {
        user: UserModel;
    };
    allCourse: CourseModel[];
    assignments: AssignmentsModel[];
}

interface AssignmentsContentProps {
    title: string;
    items: AssignmentsModel[];
    icon: LucideIcon;
    link: (a: AssignmentsModel) => string;
    allCourse: CourseModel[];
    user: UserModel;
}

export default function AssignmentsContent({ title, items, icon, link, allCourse, user }: AssignmentsContentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const courseIdFromItems = items.length > 0 ? items[0].course_id : (allCourse[0]?.id ?? '');

    function handleDeleteAssignment(id: string | number) {
        if (confirm('Confirm delete this course?')) {
            const toastStatus = toast.loading('Deleting course...');
            setIsLoading(true);

            router.delete(`/admin/courses/${id}`, {
                onSuccess: () => {
                    toast.success('Course deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete course.');
                },
                onFinish: () => {
                    setIsLoading(false);
                    toast.dismiss(toastStatus);
                },
            });
        }
    }

    function handleUpdateAssignment(id: string | number) {
        const toastStatus = toast.loading('Redirecting...');
        setIsLoading(true);

        setTimeout(() => {
            toast.dismiss(toastStatus);
            // router.get(route('assignments.edit', id));
            router.get(route('assignments.edit', id));
        }, 500);
    }

    return (
        <div className="flex min-h-screen w-full flex-row">
            <div className="flex w-full justify-center px-4 py-4">
                <div className="h-[90vh] w-full overflow-y-auto  p-8 dark:from-[#121212] dark:to-[#1f1f1f]">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex w-full items-center justify-between gap-3">
                            <div className="flex flex-row items-center">
                                <ClipboardList className="mr-3 h-7 w-7 text-[#F2951B] dark:text-[#F2951B]" />
                                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                                    {['admin', 'teacher'].includes(user.role) ? 'Manage Assignment' : 'Your Assignment'}
                                </h2>
                            </div>

                            {(user.role === 'admin' || user.role === 'teacher') && courseIdFromItems && (
                                <Link
                                    href={route('assignments.create', courseIdFromItems)} // assuming this is your route
                                    className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 from-[#F2951B] to-[#FFD599] px-4 py-2 text-sm font-medium shadow hover:opacity-90 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-gradient-to-r dark:text-white"
                                >
                                    <ClipboardList className="mx-1 h-5 w-5 text-[#F2951B] dark:text-white" />
                                    New Assignment
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {items.length === 0 ? (
                            <div className="flex h-[72vh] flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                                No threads available. Be the first to start a discussion for this class.
                            </div>
                        ) : (
                            items.map((assignment, index) => {
                                const course = allCourse.find((c) => c.id === assignment.course_id);

                                return (
                                    <a key={index} target="_blank" rel="noopener noreferrer" className="block">
                                        <Card
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    console.log('Card activated by keyboard');
                                                }
                                            }}
                                            className="cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
                                        >
                                            <CardContent className="flex flex-col space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                                                    <Badge variant="secondary" className="text-xs">
                                                        Attempt Limit: {assignment.attempt_limit}
                                                    </Badge>
                                                </div>

                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    <span className="bg-gradient-to-r from-[#F2951B] to-[#FFD599] bg-clip-text font-medium text-transparent">
                                                        Session ID: {assignment.session_id}
                                                    </span>
                                                </p>

                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {assignment.description || 'No description provided for this thread.'}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">📅 Due: {assignment.due_date}</p>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => handleUpdateAssignment(assignment.id)}
                                                            className="cursor-pointer hover:bg-white dark:hover:bg-slate-700"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            disabled={isLoading}
                                                            onClick={() => handleDeleteAssignment(assignment.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </a>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

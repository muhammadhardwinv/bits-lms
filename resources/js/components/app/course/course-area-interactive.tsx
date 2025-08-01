'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { CourseModel, UserModel } from '@/lib/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CourseAreaInteractive({ user, allCourse }: { user: UserModel; allCourse: CourseModel[] }) {
    const [isLoading, setIsLoading] = useState(false);

    function handleAddCourses() {
        const role = user?.role;
        if (role === 'admin') {
            router.visit(route('admin.courses.create'));
        } else if (role === 'teacher') {
            router.visit(route('teacher.courses.create'));
        } else {
            console.warn('Unauthorized role:', role);
        }
    }

    function handleDeleteCourse(id: number | string) {
        if (confirm('Do you wish to delete this course?')) {
            const toastStatus = toast.loading('Deleting course.');
            router.delete(route('admin.courses.destroy', id), {
                onSuccess: () => {
                    toast.dismiss(toastStatus);
                    toast.success('Course deleted successfully!');
                    router.visit('/courses');
                },
                onError: () => {
                    toast.dismiss(toastStatus);
                    toast.error('Failed to delete the course.');
                },
            });
        }
    }

    function handleUpdateCourse(courseId: string | number) {
        const toastStatus = toast.loading('Redirecting to Update Course page.');
        setIsLoading(true);
        setTimeout(() => {
            toast.dismiss(toastStatus);
            router.get(`/admin/courses/${courseId}/edit`);
        });
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="mb-6 ml-4 flex flex-row items-center justify-between border-b pb-4 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100">
                {user.role === 'admin' ? <h1>Manage Course</h1> : <h3>Your Course</h3>}

                {(user.role === 'teacher' || user.role === 'admin') && (
                    <button
                        type="button"
                        onClick={handleAddCourses}
                        className="cursor-pointer rounded-xl border bg-[#0097DA] px-2 py-2 text-sm text-white hover:bg-[#014769] dark:bg-[#0097DA] dark:hover:bg-[#014769]"
                    >
                        Add Course
                    </button>
                )}
            </div>

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {allCourse.map((course) => (
                    <div key={course.id} className="relative">
                        <Card
                            role="button"
                            tabIndex={0}
                            onClick={() => router.visit(`/selected-course/${course.id}`)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    console.log('Course activated by keyboard');
                                }
                            }}
                            className="flex h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
                        >
                            <CardContent className="flex h-full flex-col justify-between">
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.name}</h3>
                                </div>

                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="bg-gradient-to-r from-[#F2951B] to-[#FFD599] bg-clip-text font-medium text-transparent">
                                        ({course.id})
                                    </span>
                                </p>

                                {(user.role === 'teacher' || user.role === 'student') && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.description || 'No description provided for this course.'}
                                    </p>
                                )}

                                <div className="mt-4 flex flex-row justify-center gap-2">
                                    {user.role === 'admin' && (
                                        <>
                                            {/* Update Course */}
                                            <AlertDialog>
                                                <AlertDialogTrigger
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation(); // 👈 prevents the card click
                                                        handleUpdateCourse(course.id);
                                                    }}
                                                    className="mt-4 flex h-8 w-32 items-center justify-center rounded-md bg-[#0097DA] text-sm font-bold text-white shadow-md hover:bg-[#014769] dark:text-white dark:hover:text-black"
                                                >
                                                    Update Course
                                                </AlertDialogTrigger>
                                            </AlertDialog>

                                            {/* Delete Course */}
                                            <AlertDialog>
                                                <AlertDialogTrigger
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation(); // 👈 prevents the card click
                                                        handleDeleteCourse(course.id);
                                                    }}
                                                    className="mt-4 flex h-8 w-32 items-center justify-center rounded-md bg-[#0097DA] text-sm font-bold text-white shadow-md hover:bg-[#014769] dark:text-white dark:hover:text-black"
                                                >
                                                    Delete Course
                                                </AlertDialogTrigger>
                                            </AlertDialog>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

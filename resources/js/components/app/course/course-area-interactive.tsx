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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CourseModel, UserModel } from '@/lib/types';
import { router } from '@inertiajs/react';
import { BookOpenText, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CourseAreaInteractive({
    user,
    allCourse = [], // default to empty array to prevent undefined
}: {
    user: UserModel;
    allCourse?: CourseModel[];
}) {
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

    function handleUpdateCourse(id: string | number) {
        if (confirm('Do you want to update this course?')) {
            const toastStatus = toast.loading('Redirecting to update page...');
            setIsLoading(true);
            toast.dismiss(toastStatus);
            router.visit(`/courses/${id}/edit`);
        }
    }

    function handleDeleteCourse(id: string | number) {
        if (confirm('Are you sure you want to delete this course?')) {
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
                    setTimeout(() => {
                        router.visit('/courses');
                    }, 2000); // 2 seconds delay before redirect
                },
            });
        }
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="mb-6 ml-4 flex flex-row items-center justify-between border-b pb-4 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100">
                {user.role === 'admin' || user.role === 'teacher' ? (
                    <h1 className="flex flex-row gap-3">
                        <BookOpenText className="mt-1 h-7 w-7" />
                        <span className="text-black dark:text-white">Manage Course</span>
                    </h1>
                ) : (
                    <h3 className="flex flex-row items-center gap-3 text-center">
                        <BookOpenText className="mt-1 h-7 w-7" />
                        <span className="text-black dark:text-white">Your Course</span>
                    </h3>
                )}

                {(user.role === 'teacher' || user.role === 'admin') && (
                    <button
                        type="button"
                        onClick={handleAddCourses}
                        className="cursor-pointer rounded-xl border bg-[#0097DA] px-2 py-2 text-sm text-white hover:bg-[#014769] dark:bg-[#0097DA] dark:hover:bg-[#014769]"
                    >
                        New Course
                    </button>
                )}
            </div>

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {(allCourse ?? []).map((course) => (
                    <div key={course.id} className="relative">
                        <Card
                            role="button"
                            tabIndex={0}
                            onClick={() => router.visit(`/sessions/${course.id}`)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    console.log('Course activated by keyboard');
                                }
                            }}
                            className="flex h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
                        >
                            <CardContent className="flex h-full flex-col justify-between">
                                <div className="mb-4 flex flex-col items-start">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.name}</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="bg-[#0097da] bg-clip-text font-medium text-transparent">Course ID: ({course.id})</span>
                                    </p>
                                </div>

                                {(user.role === 'teacher' || user.role === 'student') && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.description || 'No description provided for this course.'}
                                    </p>
                                )}

                                {user.role === 'admin' && <div className="mt-4 flex flex-row justify-center gap-2"></div>}
                            </CardContent>
                        </Card>

                        {user.role === 'admin' && (
                            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleUpdateCourse(course.id);
                                    }}
                                    className="cursor-pointer hover:bg-white dark:hover:bg-slate-700"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    disabled={isLoading}
                                    className="hover:-bg-[#F2951B] cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteCourse(course.id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
                                                <AlertDialogDescription>Are you sure want to delete the selected course?</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteCourse(course.id)}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

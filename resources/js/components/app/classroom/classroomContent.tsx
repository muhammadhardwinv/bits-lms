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
import { Separator } from '@/components/ui/separator';
import { ClassesType, UserModel } from '@/lib/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Goal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ClassroomContent() {
    const { allClassrooms, auth } = usePage<{ allClassrooms: ClassesType[]; auth: { user: UserModel } }>().props;
    const [isLoading, setIsLoading] = useState(false);

    function handleDeleteClassroom(id: string | number) {
        const toastStatus = toast.loading('Deleting classroom...');
        setIsLoading(true);

        router.delete(`/admin/classrooms/${id}`, {
            onSuccess: () => {
                toast.success('Classroom deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete classroom.');
            },
            onFinish: () => {
                setIsLoading(false);
                toast.dismiss(toastStatus);
                router.reload({ only: ['allClassrooms'] });
            },
        });
    }

    function handleEditClassroom(id: string | number) {
        const toastStatus = toast.loading('Redirecting...');
        router.visit(`/admin/classrooms/${id}/edit`);
        toast.dismiss(toastStatus);
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="mb-16 items-center justify-between">
                <div className="mb-6 ml-4 flex flex-row items-center justify-between border-b pb-4 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100">
                    <div className="flex flex-row items-center gap-3">
                        <Goal className="h-8 w-8" />
                        <h1 className="text-3xl font-bold"> Classroom List</h1>
                    </div>

                    {auth.user.role === 'admin' && (
                        <Button
                            onClick={() => router.visit(route('admin.classroom.create'))}
                            className="cursor-pointer rounded-lg border bg-white px-4 py-2 text-black shadow hover:bg-[#0097da] hover:text-white dark:bg-[#1c1c1c] dark:text-white dark:hover:bg-[#0097DA]"
                        >
                            New Classroom
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allClassrooms?.map((classes) => (
                    <div
                        key={classes.id}
                        className="relative block cursor-pointer rounded-xl border bg-white p-8 shadow transition hover:shadow-lg dark:bg-[#1c1c1c] dark:text-white hover:dark:bg-[#0097da]"
                    >
                        <Link href={route('classroom.show', classes.id)} className="block">
                            <h2 className="mb-2 text-xl font-semibold">{classes.name}</h2>
                            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
                                Course ID: <span className="font-medium">{classes.course_id}</span>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Teacher ID: <span className="font-medium">{classes.teacher_id}</span>
                            </p>
                        </Link>

                        {auth.user.role === 'admin' && (
                            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="cursor-pointer hover:bg-slate-500 dark:bg-gray-700 dark:hover:bg-slate-400"
                                            size="icon"
                                            variant="outline"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                            }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Edit classroom?</AlertDialogTitle>
                                            <AlertDialogDescription>Do you want to edit this classroom’s details?</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleEditClassroom(classes.id)}>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="cursor-pointer hover:bg-red-900 dark:bg-red-700 dark:hover:bg-slate-400"
                                            size="icon"
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete classroom?</AlertDialogTitle>
                                            <AlertDialogDescription>Are you sure? This action cannot be undone.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteClassroom(classes.id)}>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {allClassrooms?.length === 0 && <p className="mt-12 text-center text-gray-500">No classrooms found.</p>}
        </div>
    );
}

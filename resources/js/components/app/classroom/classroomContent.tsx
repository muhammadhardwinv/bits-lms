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
import { ClassroomType, UserModel } from '@/lib/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ClassroomContent() {
    const { allClassrooms, auth } = usePage<{ allClassrooms: ClassroomType[]; auth: { user: UserModel } }>().props;
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
        <div className="px-6 py-4">
            <div className="mb-16 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Classroom List</h1>

                {auth.user.role === 'admin' && (
                    <Button
                        onClick={() => router.visit(route('admin.classroom.create'))}
                        className="cursor-pointer rounded-lg border bg-white px-4 py-2 text-black shadow hover:bg-[#0097da] hover:text-white dark:bg-[#1c1c1c] dark:text-white dark:hover:bg-[#0097DA]"
                    >
                        + New Classroom
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allClassrooms?.map((classroom) => (
                    <div
                        key={classroom.id}
                        className="relative block cursor-pointer rounded-xl border bg-white p-5 shadow transition hover:bg-[#0097da] dark:bg-[#1c1c1c] dark:text-white hover:dark:bg-[#0097da]"
                    >
                        <Link href={route('classroom.show', classroom.id)} className="block">
                            <h2 className="mb-2 text-xl font-semibold">{classroom.name}</h2>
                            <p className="mb-1 text-sm text-gray-600">
                                Course ID: <span className="font-medium">{classroom.course_id}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Teacher ID: <span className="font-medium">{classroom.teacher_id}</span>
                            </p>
                        </Link>

                        {auth.user.role === 'admin' && (
                            <div className="absolute top-3 right-3 z-10 flex gap-2">
                                <Button
                                    className="cursor-pointer"
                                    size="icon"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleEditClassroom(classroom.id);
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="cursor-pointer"
                                            size="icon"
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.preventDefault();
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
                                            <AlertDialogAction onClick={() => handleDeleteClassroom(classroom.id)}>Confirm</AlertDialogAction>
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

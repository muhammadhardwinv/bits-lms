import { Card, CardContent } from '@/components/ui/card';
import { UserModel } from '@/lib/types';
import { BookIcon, Minus, Plus } from 'lucide-react';
import * as React from 'react';
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
} from './ui/alert-dialog';

const courseDetails = [
    {
        name: 'Mathematics',
        classId: 'X-01',
        courseId: 'MATH-2301',
        description: 'Master algebra, geometry, and calculus concepts with real-life problem solving.',
    },
    {
        name: 'Physics',
        classId: 'X-02',
        courseId: 'PHYS-2302',
        description: 'Explore motion, energy, and quantum principles through hands-on science.',
    },
    {
        name: 'Chemistry',
        classId: 'X-03',
        courseId: 'CHEM-2303',
        description: 'Dive into the world of atoms, molecules, and reactions in everyday life.',
    },
    {
        name: 'History',
        classId: 'X-05',
        courseId: 'HIST-2305',
        description: 'Trace human progress from ancient civilizations to modern societies.',
    },
    {
        name: 'English Literature',
        classId: 'X-06',
        courseId: 'ENG-2306',
        description: 'Analyze storytelling and literary themes from Shakespeare to contemporary authors.',
    },
    {
        name: 'Mandarin Literature',
        classId: 'M-06',
        courseId: 'CHN-2306',
        description: 'Appreciate Chinese prose and poetry while exploring culture and heritage.',
    },
];

export default function ForumsContent({
    title,
    icon: {},
    items,
    user,
}: {
    title: string;
    icon: React.ElementType;
    items: string[];
    user: UserModel;
}) {
    return (
        <div className="w-full space-y-8 p-6">
            <div className="w-full space-y-1">
                <h1 className="text-4xl font-bold">Forums</h1>
                <p className="text-xl text-gray-600">LK001-LEC</p>
            </div>

            {/* Separator Line */}
            {/* <div className="w-[85vw] border-t py-2" /> */}

            {/* Grid Section */}
            <div className="grid grid-cols-6 gap-4 border-y py-6">
                {/* buat scrollable content buat forum, beserta dengan breadcrumbs action */}

                <div className="col-span-1 grid h-[60vh] w-[80vw] flex-1 overflow-y-auto rounded-lg border bg-gradient-to-br from-white to-blue-50 p-4 shadow-md dark:from-[#121212] dark:to-[#1f1f1f]">
                    <div className="flex items-center justify-between gap-2 pb-2">
                        <div className="my-4 flex items-center gap-2">
                            <BookIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                            <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                        </div>
                        <div className="flex w-[5vw] justify-between">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-2xl font-bold">
                                        <Plus />
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Add New Thread</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to add a new discussion thread to the forum? This action will notify all students
                                            and make the thread publicly visible.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Yes, Add</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xl font-bold">
                                        <Minus />
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Thread</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to permanently delete this discussion thread? This action cannot be undone and the
                                            thread will be removed for all users.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Yes, Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {items.map((label, index) => (
                            <Card
                                key={index}
                                className="border border-gray-200 bg-white/80 transition-all duration-300 hover:scale-[1.01] hover:shadow-md dark:border-gray-700 dark:bg-[#181818]"
                            >
                                <CardContent className="ml-2 flex items-center gap-3 p-4">
                                    <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

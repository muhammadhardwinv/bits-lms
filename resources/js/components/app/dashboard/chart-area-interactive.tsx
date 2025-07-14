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
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { UserModel } from '@/lib/types';
import { Link } from '@inertiajs/react';
import { ActivitySquare, ClipboardList } from 'lucide-react';
import * as React from 'react';
import { useUserStore } from '@/lib/store/userStore';

export const description = 'An interactive area chart';
function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
        <div className="flex h-full w-full max-w-[23vw] flex-col overflow-hidden rounded-lg border bg-gradient-to-br from-indigo-100 to-purple-100 p-1 shadow-md dark:border-gray-700 dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="flex-1 rounded-md bg-white p-2 dark:bg-[#181818]">
                <div className="items-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="h-[54vh] w-full origin-top scale-[1] transform text-[13px] leading-tight text-gray-900 dark:bg-[#181818] dark:text-gray-100"
                        captionLayout="dropdown"
                    />
                </div>

                <div className="rounded-md border bg-white text-center shadow-sm dark:border-gray-700 dark:bg-[#181818]">
                    <h4 className="text-sm text-gray-800 dark:text-gray-100">Current Date: {date?.toDateString()}</h4>
                </div>
            </div>
        </div>
    );
}
function SectionCard({ title, icon: Icon, items, user }: { title: string; icon: React.ElementType; items: string[]; user: UserModel }) {
    const { role, courseId } = useUserStore();
    const firstClass = user.classes?.[0];

    return (
        <div className="h-[60vh] w-full max-w-[32vw] flex-1 overflow-y-auto rounded-lg border bg-gradient-to-br from-white to-blue-50 p-4 shadow-md dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="flex items-center gap-2 pb-4">
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="space-between mx-1 flex flex-row items-center">
                        <Icon className="mx-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                    </div>

                    {role === 'lecturer' && (
                        <Link
                            href={route('select-class')}
                            className="mr-4 items-center rounded-full bg-indigo-100 px-2 text-lg font-bold text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300"
                        >
                            +
                        </Link>
                    )}
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        {user.role === 'lecturer' && firstClass && (
                            <Link
                                href={`/assignment/${firstClass.courseName}/${firstClass.courseId}`}
                                className="rounded-full border border-gray-300 bg-gray-100 p-2 text-2xl text-indigo-600 hover:bg-gray-200"
                                title="Add Assignment"
                            >
                                +
                            </Link>
                        )}
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently add a new response to the system and make it visible to all
                                students.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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
    );
}
export function ChartAreaInteractive({ user }: { user: UserModel }) {
    const recentActivity = ['Nadia submitted Lab 3', 'Ali started Discussion on Module 2'];

    const assignments = [
        'Assignment #1: Algorithm Design',
        'Assignment #2: Database Schema',
        'Assignment #3: OS Scheduling',
        'Assignment #4: UI Wireframes',
        'Assignment #5: Cloud Deployment',
        'Assignment #6: SQL Optimization',
        'Assignment #7: REST API Setup',
        'Assignment #8: Final Report Draft',
        'Assignment #9: Testing Plan',
        'Assignment #10: Presentation Slides',
    ];

    return (
        <div className="mx-auto mb-6 flex max-w-[95vw] flex-wrap justify-between gap-4 px-4 lg:px-6">
            <SectionCard title="Recent Activity" icon={ActivitySquare} items={recentActivity} user={user} />
            <SectionCard title="Assignments" icon={ClipboardList} items={assignments} user={user} />
            <CalendarDemo />
        </div>
    );
}

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
import { ActivitySquare, ClipboardList } from 'lucide-react';
import * as React from 'react';

export const description = 'An interactive area chart';

function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="flex h-[60vh] w-[24vw] max-w-[32vw] flex-col rounded-lg border bg-gradient-to-br from-indigo-100 to-purple-100 p-4 shadow-md dark:from-[#1a1a2e] dark:to-[#2c2c3a]">
            <div className="flex justify-center pb-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">📅 Schedule Overview</h2>
            </div>
            <div className="h-[45vh] w-full">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="h-full w-full rounded-md border text-sm shadow-sm"
                    captionLayout="dropdown"
                />
            </div>
            <div className="my-4 flex flex-col rounded-lg border bg-white from-white shadow-md dark:from-[#1a1a2e] dark:to-[#2c2c3a]">
                <h4 className="text-md font-regular my-2 mb-2 flex items-center justify-center text-gray-800 dark:text-gray-100">
                    {date?.toDateString()}
                </h4>
            </div>
        </div>
    );
}

function SectionCard({ title, icon: Icon, items, user }: { title: string; icon: React.ElementType; items: string[]; user: UserModel }) {
    return (
        <div className="col-span-1 h-[60vh] max-w-[32vw] flex-1 overflow-y-auto rounded-lg border bg-gradient-to-br from-white to-blue-50 p-4 shadow-md dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="flex items-center justify-between gap-2 pb-4">
                <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                            className={`text-bold-400 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-gray-100 p-4 text-2xl ${user.role == 'student' ? 'hidden' : ''} `}
                        >
                            +
                        </button>
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
    const recentActivity = [
        'Nadia submitted Lab 3',
        'Ali started Discussion on Module 2',
        'Maya completed Quiz 2',
        'John shared announcement',
        'Farah asked question to instructor',
        'Rudi updated profile photo',
        'Ayu uploaded Assignment 4',
        'Budi marked attendance',
        'Tina commented on peer post',
        'Yusuf joined new group project',
    ];

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

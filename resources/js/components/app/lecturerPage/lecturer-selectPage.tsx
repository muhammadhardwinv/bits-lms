'use client';

import { forumContents } from '@/lib/forumContent';
import { router } from '@inertiajs/react';

export default function LecturerSelectPageContent() {
    const handleSelect = (courseId: string) => {
        router.visit(`/discussion/${courseId}`);
    };

    return (
        <div className="mx-auto mt-10 w-full rounded-lg bg-white px-6 shadow-md dark:bg-[#1e1e1e]">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white">Select a Class to Create a Discussion</h1>

            <ul className="space-y-3">
                {forumContents.map((forum) => (
                    <li
                        key={forum.classId}
                        onClick={() => handleSelect(forum.courseId)}
                        className="cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-[#2a2a2a]"
                    >
                        <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">{forum.courseName}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Course ID: {forum.courseId}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Class ID: {forum.classId}</p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{forum.lecturerName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

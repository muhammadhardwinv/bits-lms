'use client';

import { ForumContentType, forumContents } from '@/lib/forumContent';
import GradeBookCard from './gradebook-card';

const gradeBoxes = [
    { gradeNumber: 1, gradeName: 'Assignment', value: 95 },
    { gradeNumber: 2, gradeName: 'Mid Exam', value: 85 },
    { gradeNumber: 3, gradeName: 'Final ', value: 83 },
];

const cPanelItems = [
    {
        title: 'Session',
        url: 'session',
    },
    {
        title: 'Discussion',
        url: 'discussion',
    },
    {
        title: 'Assessment',
        url: 'assessment',
    },
    {
        title: 'Gradebook',
        url: 'gradebook',
    },
    {
        title: 'People',
        url: 'people',
    },
    {
        title: 'Attendance',
        url: 'attendance',
    },
];
interface Props {
    courseId: string;
}
const grade = ['Assignment', 'Mid Exam', 'Final Exam'];
export function CourseGradeTop({ courseId }: Props) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === courseId);

    if (!forum) {
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {courseId}</h1>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold">{forum.forumTitle}</h1>
                <p className="text-xl text-gray-600">{forum.courseId}</p>
                <p className="mt-8 ml-16 text-lg font-semibold">{forum.lecturerName}</p>
                <p className="text-md ml-16 text-gray-500">{forum.lecturerId}</p>
            </div>

            <div className="mx-10 flex flex-row items-center justify-between gap-6 text-center">
                {[
                    { label: 'Session', href: `/courses/${forum.courseId}/slideshow` },
                    { label: 'Discussion', href: `/discussion/${forum.courseId}` },
                    { label: 'Assessment', href: `/assignment/${forum.courseId}` },
                    { label: 'Gradebook', href: `/gradebook/${forum.courseId}` },
                    { label: 'People', href: '#' },
                    { label: 'Attendance', href: '#' },
                ].map((item, index) => (
                    <a key={index} href={item.href} className="w-full">
                        <div className="w-full rounded-lg border border-gray-300 bg-white px-4 py-6 text-sm font-medium text-gray-800 shadow-sm transition duration-200 hover:bg-gray-50 hover:underline hover:shadow-md">
                            {item.label}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export function CourseGradeContent({ courseId }: Props) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === courseId);

    if (!forum) {
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {courseId}</h1>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-6 px-9">
                {gradeBoxes.map((gradeBox, index) =>
                    GradeBookCard({
                        title: gradeBox.gradeName,
                        value: gradeBox.value,
                    }),
                )}
            </div>
        </div>
    );
}

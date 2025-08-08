import { ForumContentType, forumContents } from '@/lib/forumContent';
import { usePage } from '@inertiajs/react';
import GradeBookCard from './gradebook-card';
import { CourseModel } from '@/lib/types';

const gradeBoxes = [
    { gradeNumber: 1, gradeName: 'Assignment', value: 95 },
    { gradeNumber: 2, gradeName: 'Mid Exam', value: 85 },
    { gradeNumber: 3, gradeName: 'Final ', value: 83 },
];

interface Props {
    course: CourseModel;
}
export function CourseGradeTop({ course }: Props) {
    const { url } = usePage();
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === course.id);

    if (!forum) {
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {course.id}</h1>
            </div>
        );
    }

    const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);
    const currentUrl = normalize(url);

    return (
        <div className="space-y-8 p-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold">{forum.forumTitle}</h1>
                <p className="text-xl text-gray-600">{forum.courseId}</p>
                <p className="mt-8 ml-16 text-lg font-semibold">{forum.lecturerName}</p>
                <p className="text-md ml-16 text-gray-500">{forum.lecturerId}</p>
            </div>

            <div className="mx-10 flex flex-row items-center justify-between gap-6 border-y py-4 text-center">
                {[
                    { label: 'Session', href: `/courses/${forum.courseId}/slideshow` },
                    { label: 'Discussion', href: `/discussion/${forum.courseId}` },
                    { label: 'Assessment', href: `/assignment/${forum.courseId}` },
                    { label: 'Gradebook', href: `/gradebook/${forum.courseId}` },
                    { label: 'People', href: `/people/${forum.courseId}` },
                    { label: 'Attendance', href: `/attendance/${forum.courseId}` },
                ].map((item, index) => {
                    const itemHref = normalize(item.href);
                    const isActive = currentUrl === itemHref || currentUrl.startsWith(itemHref + '/');

                    return (
                        <a key={index} href={item.href} className="w-full">
                            <div
                                className={`w-full rounded-lg border px-4 py-6 text-sm font-medium shadow-sm transition duration-200 ${
                                    isActive
                                        ? 'border-indigo-300 bg-indigo-100 text-indigo-900 dark:border-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                                        : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:underline hover:shadow-md dark:border-[#3a3a3a] dark:bg-[#1b1b1b] dark:text-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                {item.label}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
export function CourseGradeContent({ course }: Props) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === course.id);

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-6 px-9">
                {gradeBoxes.map((gradeBox) =>
                    GradeBookCard({
                        title: gradeBox.gradeName,
                        value: gradeBox.value,
                    }),
                )}
            </div>
        </div>
    );
}

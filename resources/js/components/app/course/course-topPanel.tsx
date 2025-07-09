import { ForumContentType, forumContents } from '@/lib/forumContent';
import { usePage } from '@inertiajs/react';

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

export function CourseGradeTop({ courseId }: Props) {
    const { url } = usePage();
    const cleanUrl = url.split(/[?#]/)[0];
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

            <div className="mx-10 flex flex-row items-center justify-between gap-4 border-y py-4 text-center">
                {[
                    { label: 'Session', href: `/current-session/${forum.courseId}` },
                    { label: 'Discussion', href: `/discussion/${forum.courseId}` },
                    { label: 'Assessment', href: `/assignment/${forum.courseId}` },
                    { label: 'Gradebook', href: `/gradebook.vie/${forum.courseId}` },
                    { label: 'People', href: `/people/${forum.courseId}` },
                    { label: 'Attendance', href: `/attendance/${forum.courseId}` },
                ].map((item, index) => {
                    const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);
                    const normalizedUrl = normalize(cleanUrl);
                    const normalizedHref = normalize(item.href);

                    const isActive = normalizedUrl === normalizedHref || normalizedUrl.startsWith(normalizedHref + '/');

                    return (
                        <a key={index} href={item.href} className="w-full">
                            <div
                                className={`w-full rounded-lg border px-4 py-6 text-sm font-medium shadow-sm transition duration-200 ${
                                    isActive
                                        ? 'border-indigo-300 bg-indigo-100 text-indigo-900 hover:bg-indigo-200 dark:border-indigo-700 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800'
                                        : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:underline hover:shadow-md dark:border-[#3a3a3a] dark:bg-[#1b1b1b] dark:text-gray-200 dark:hover:bg-gray-800'
                                } flex items-center justify-center gap-2`}
                            >
                                {/* + if active (green), - if inactive (red) */}
                                <span
                                    className={`font-bold ${isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                                ></span>
                                <span>{item.label}</span>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

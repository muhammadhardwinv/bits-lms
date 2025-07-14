import { Separator } from '@/components/ui/separator';
import { ForumContentType, forumContents } from '@/lib/forumContent';
import { smt } from '@/lib/semesterDetails';
import { Semester } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

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

export type semesterOptions = (typeof smt)[number];

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

    const [newSemester, setNewSemester] = useState<Partial<Semester>>({
        name: '',
        academicYear: '',
        startDate: '',
        endDate: '',
        isActive: false,
    });

    const handleChange = (field: keyof Semester, value: string | boolean) => {
        setNewSemester((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Submitting semester: ', newSemester);
    };

    return (
        <div className="space-y-2 p-4">
            <div>
                <label className="text-gray text-md block text-sm font-medium dark:text-gray-300">Select Semester:</label>
                <select
                    value={newSemester.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-[15vw] rounded border border-gray-300 text-sm dark:bg-gray-800 dark:text-white"
                >
                    <option value="">YYYY, Odd Semester</option>
                    {smt.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4 space-y-1">
                <h1 className="text-4xl font-bold">{forum.forumTitle}</h1>
                <p className="text-xl text-gray-600">{forum.courseId}</p>
                <p className="mt-8 ml-16 text-lg font-semibold">{forum.lecturerName}</p>
                <p className="text-md ml-16 text-gray-500">{forum.lecturerId}</p>
            </div>
            <Separator />

            <div className="mx-10 flex flex-row items-center justify-between gap-4 py-4 text-center">
                {[
                    { label: 'Session', href: `/current-session/${forum.courseId}` },
                    { label: 'Discussion', href: `/discussion/${forum.courseId}` },
                    { label: 'Assessment', href: `/assignment/${forum.courseId}` },
                    { label: 'Gradebook', href: `/gradebook/${forum.courseId}` },
                    { label: 'People', href: `/people/${forum.courseId}` },
                    { label: 'Attendance', href: `/attendance/${forum.courseId}` },
                ].map((item, index) => {
                    const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);
                    const normalizedUrl = normalize(cleanUrl);
                    const normalizedHref = normalize(item.href);

                    // const isActive = normalizedUrl === normalizedHref || normalizedUrl.startsWith(normalizedHref + '/');
                    const isActive =
                        normalizedUrl === normalizedHref ||
                        normalizedUrl.startsWith(normalizedHref + '/') ||
                        (normalizedUrl.startsWith(`/selected-course/${forum.courseId}`) && item.label === 'Session');

                    return (
                        <a key={index} href={item.href} className="w-full">
                            <div
                                className={`w-full rounded-lg px-4 py-6 text-sm font-medium shadow-sm transition duration-200 ${
                                    isActive
                                        ? 'text-black-900 border-indigo-300 bg-[#F2951B] hover:bg-[#f2b463] dark:bg-[#F2951B] dark:text-indigo-100 dark:hover:bg-[#F2951B]'
                                        : 'border-gray-300 bg-white text-gray-800 hover:bg-[#f2b463] hover:underline hover:shadow-md dark:bg-[#1b1b1b] dark:text-gray-200 dark:hover:bg-[#f2b463]'
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
            <Separator />
        </div>
    );
}

import { Separator } from '@/components/ui/separator';
import { smt } from '@/lib/semesterDetails';
import { Semester } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    courseId: string;
    courseName: string;
}

export type semesterOptions = (typeof smt)[number];

export function CourseGradeTop({ courseId, courseName }: Props) {
    const { url } = usePage();
    const cleanUrl = url.split(/[?#]/)[0];

    const lecturerName = 'Prof. Dr. Ir. Widodo Budiharto, S.Si., M.Kom., IPM., SMIEEE';
    const lecturerId = 'D2637 - Primary Instructor';
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

    return (
        <div className="space-y-2 px-6 py-4">
            <div className="mb-4 w-full">
                <div>
                    <h1 className="text-4xl">{courseName}</h1>
                    <div className="my-1 ml-8 flex w-[28vw] flex-row justify-start gap-12">
                        <p className="text-xl text-gray-600">COMPSCI{courseId}</p>
                        <p className="mb-6 text-xl text-gray-600">LEC-{courseId}</p>
                    </div>
                    <Separator />
                </div>
                <div className="my-3 flex flex-row">
                    <div>
                        <p className="ml-16 text-lg font-semibold">{lecturerName}</p>
                        <p className="text-md ml-16 text-gray-500">{lecturerId}</p>
                    </div>
                </div>
            </div>
            <div>
                <Separator />
            </div>

            <div className="flex flex-row items-center justify-between gap-4 py-4 text-center">
                {[
                    { label: 'Session', href: `/sessions/${courseId}` }, // ✅ FIXED here
                    { label: 'Discussion', href: `/discussion/${courseId}` },
                    { label: 'Assessment', href: `/assignment/${courseId}` },
                    { label: 'Gradebook', href: `/gradebook/${courseId}` },
                    { label: 'People', href: `/people/${courseId}` },
                    { label: 'Attendance', href: `/attendance/${courseId}` },
                ].map((item, index) => {
                    const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);
                    const normalizedUrl = normalize(cleanUrl);
                    const normalizedHref = normalize(item.href);

                    // ✅ FIXED: Treat both `/sessions/...` and `/current-session/...` as active for Session tab
                    const isSessionRoute =
                        (normalizedUrl.startsWith(`/sessions/${courseId}`) || normalizedUrl.startsWith(`/current-session/${courseId}`)) &&
                        item.label === 'Session';

                    const isActive = normalizedUrl === normalizedHref || normalizedUrl.startsWith(normalizedHref + '/') || isSessionRoute;
                    return (
                        <a key={index} href={item.href} className="w-full">
                            <div
                                //'border-gray-200 bg-[#0097DA] text-white hover:bg-[#014769] dark:border-black dark:bg-[#1b1b1b] dark:text-white dark:hover:bg-[#F2951B]'
                                className={`w-full items-center rounded-lg px-4 py-6 text-center text-sm font-medium shadow-sm transition duration-200 ${
                                    isActive
                                        ? 'border text-[#F2951B] hover:bg-white hover:text-white dark:border-gray-300 dark:bg-[#1b1b1b] dark:text-[#F2951B] dark:hover:bg-[#F2951B] dark:hover:text-white'
                                        : 'border border-gray-200 bg-white text-black hover:bg-[#F2951B] hover:text-white hover:shadow-md dark:border-gray-700 dark:bg-[#1b1b1b] dark:text-white dark:hover:bg-[#F2951B]'
                                } flex items-center justify-center gap-2`}
                            >
                                <span
                                    className={`font-bold ${isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                                ></span>
                                <span>{item.label}</span>
                            </div>
                        </a>
                    );
                })}
            </div>
            <div>
                <Separator />
            </div>
        </div>
    );
}

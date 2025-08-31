import { ClassesType, Semester, UserModel } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';

interface Props {
    courseId: string;
    courseName: string;
}
interface PageProps {
    auth: { user: UserModel };
    classroom: ClassesType;
    classroomId?: string;
    [key: string]: any;
}

export function CourseGradeTop({ courseId, courseName }: Props) {
    const { url } = usePage();
    const cleanUrl = url.split(/[?#]/)[0];
    const { classroom, classroomId, auth } = usePage<PageProps>().props;

    const lecturerName = 'Prof. Dr. Ir. Widodo Budiharto, S.Si., M.Kom., IPM., SMIEEE';
    const lecturerTemplate = 'Primary Instructor';

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

    const tabs = [
        { label: 'Session', href: `/sessions/${courseId}` },
        { label: 'Discussion', href: `/discussion/${courseId}` },
        { label: 'Assessment', href: `/assignment/${courseId}` },
        { label: 'Gradebook', href: `/gradebook/${courseId}` },
        { label: 'People', href: `/people/${courseId}` },
        { label: 'Attendance', href: `/attendance/${courseId}` },
    ];

    const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);
    const normalizedUrl = normalize(cleanUrl);

    // Determine active tab index
    const matchedIndex = tabs.findIndex((item) => {
        const normalizedHref = normalize(item.href);
        const isSessionRoute =
            (normalizedUrl.startsWith(`/sessions/${courseId}`) || normalizedUrl.startsWith(`/current-session/${courseId}`)) &&
            item.label === 'Session';

        return normalizedUrl === normalizedHref || normalizedUrl.startsWith(normalizedHref + '/') || isSessionRoute;
    });

    const activeIndex = matchedIndex === -1 ? 0 : matchedIndex; // fallback to first tab

    return (
        <div className="space-y-2 px-6 py-1">
            <div className="mb-4 w-full">
                <h1 className="text-4xl">{courseName}</h1>
                <div className="my-1 ml-8 flex w-[28vw] flex-row justify-start gap-12">
                    <p className="text-xl text-gray-600">{classroom.course_id}</p>
                    <p className="mb-6 text-xl text-gray-600">{classroom.id}-LEC</p>
                </div>
                <Separator />

                <div className="my-1 flex flex-row">
                    <div>
                        <p className="ml-16 text-lg font-semibold">{classroom.name}</p>
                        <p className="text-md ml-16 text-gray-500">
                            {classroom.name} - {classroom.id}
                        </p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="-mb-0 flex flex-row items-center justify-between gap-4 py-2 text-center">
                {tabs.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <a key={index} href={item.href} className="w-full">
                            <div
                                className={`flex w-full items-center justify-center gap-2 px-4 py-4 text-center text-sm font-medium shadow-sm transition duration-200 ${
                                    isActive
                                        ? 'border-b-4 border-[#F2951B] font-bold text-[#F2951B]' // ✅ Active style: orange + bottom underline
                                        : 'border-b-4 border-transparent text-gray-600 hover:text-[#F2951B]' // inactive
                                } `}
                            >
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

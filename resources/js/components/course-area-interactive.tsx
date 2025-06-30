'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@inertiajs/react';

type Lesson = { ticks: boolean[] };
type Course = { lessons: Lesson[] };
type AllCourses = Course[];

type CourseInfo = {
    name: string;
    classId: string;
    courseId: string;
    description: string;
};

function calculateProgress(courses: AllCourses): number {
    const totalTicks = 60 * 5;
    const unitProgress = 180 / totalTicks;
    let completed = 0;
    courses.forEach((course) =>
        course.lessons.forEach((lesson) => {
            completed += lesson.ticks.filter(Boolean).length;
        }),
    );
    return parseFloat((completed * unitProgress).toFixed(1));
}

const courseDetails: CourseInfo[] = [
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

const mockCourses: AllCourses = [
    { lessons: Array(10).fill({ ticks: [true, true, false, false, false] }) },
    { lessons: Array(10).fill({ ticks: [true, false, false, false, true] }) },
    { lessons: Array(10).fill({ ticks: [false, false, true, false, false] }) },
    { lessons: Array(10).fill({ ticks: [true, true, true, true, true] }) },
    { lessons: Array(10).fill({ ticks: [false, false, false, false, false] }) },
    { lessons: Array(10).fill({ ticks: [true, true, true, true, true] }) },
];

export function CourseAreaInteractive() {
    return (
        <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course, index) => {
                const info = courseDetails[index];
                const progress = calculateProgress([course]);
                const slug = info.name.toLowerCase().replace(/\s+/g, '-');

                return (
                    <Link
                        key={info.courseId}
                        href={`/courses/${slug}`}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md"
                    >
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-indigo-700 group-hover:underline">{info.name}</h2>
                            <p className="text-xs text-gray-500">Course ID: {info.courseId}</p>
                            <p className="text-xs text-gray-500">Class ID: {info.classId}</p>
                        </div>

                        <Card className="bg- -50/60 my-4 border-0 shadow-none">
                            <CardContent className="p-4 text-sm leading-relaxed text-gray-700">{info.description}</CardContent>
                        </Card>

                        <div className="mt-2">
                            <span className="mb-1 block text-center text-xs font-medium text-gray-600">Progress: {progress}%</span>
                            <Progress value={progress} className="h-2 rounded-full bg-gray-200" />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

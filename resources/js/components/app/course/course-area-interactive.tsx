'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@inertiajs/react';
import { courseScores, CourseScoreType } from '@/lib/courseScores';
import { courses } from '@/lib/coursesDetails';

type TickLesson = { ticks: boolean[] };

function calculateProgress(lessons: TickLesson[]): number {
    const totalTicks = 60 * 5;
    const unitProgress = 180 / totalTicks;

    let completed = 0;
    lessons.forEach((lesson) => {
        completed += lesson.ticks.filter(Boolean).length;
    });

    return parseFloat((completed * unitProgress).toFixed(1));
}

type MergedCourseType = CourseScoreType & {
    title: string;
    courseName: string;
    description: string;
    type: string;
    dueDate: string;
    link: string;
    slug: string;
};

export function CourseAreaInteractive() {
    const mergedCourses = courseScores
        .map((score) => {
            const info = courses.find((c) => c.courseId === score.courseId && c.classId === score.classId);

            if (!info) return null;

            return {
                ...score,
                ...info,
                slug: info.title.toLowerCase().replace(/\s+/g, '-'),
            };
        })
        .filter(Boolean) as MergedCourseType[]; // cast after filter(Boolean)

    return (
        <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 xl:grid-cols-3">
            {mergedCourses.map((course) => (
                <Link
                    key={course.courseId}
                    href={`/selected-course/${course.courseId}`} // ✅ use lowercase to match route
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gradient-to-br dark:from-[#121212] dark:to-[#1f1f1f]"
                >
                    <h2 className="text-lg font-semibold text-indigo-700 group-hover:underline dark:text-indigo-400">{course.title}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Course ID: {course.courseId}</p>

                    <Card className="my-4 border-0 bg-muted/20 shadow-none dark:bg-white/5">
                        <CardContent className="p-4 text-sm text-gray-700 dark:text-gray-300">{course.description}</CardContent>
                    </Card>

                    <div className="mt-auto">
                        <p className="mb-1 block text-center text-xs text-gray-600 dark:text-gray-400">Progress: {course.progress}%</p>
                        <Progress value={course.progress} className="h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                    </div>
                </Link>
            ))}
        </div>
    );
}

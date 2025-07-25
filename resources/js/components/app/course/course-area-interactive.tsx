'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@inertiajs/react';
import { courseScores, CourseScoreType } from '@/lib/courseScores';
import { courses } from '@/lib/coursesDetails';
import { BookOpenText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
            <h1 className="mb-6 ml-4 flex flex-row items-center justify-between border-b pb-4 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100">
                <div className="flex flex-row items-center gap-2">
                    <BookOpenText className="h-5 w-5 text-[#F2951B] dark:text-[#F2951B]" />
                    Your Courses
                </div>
            </h1>

            <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 xl:grid-cols-3">
                {mergedCourses.map((course) => (
                    <Link
                        key={course.courseId}
                        href={`/selected-course/${course.courseId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Card
                            role="button"
                            tabIndex={0}
                            onClick={() => console.log('Course clicked')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    console.log('Course activated by keyboard');
                                }
                            }}
                            className="flex h-[400px] cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
                        >
                            <CardContent className="flex h-full flex-col justify-between">
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.title}</h3>
                                    <Badge variant="secondary" className="text-xs">
                                        Progress
                                    </Badge>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="bg-gradient-to-r from-[#F2951B] to-[#FFD599] bg-clip-text font-medium text-transparent">
                                            {course.courseName} - {}
                                        </span>
                                        ({course.courseId}) — Class {course.classId}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.description || 'No description provided for this course.'}
                                    </p>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-400 dark:text-gray-500">📊 Progress: {course.progress}%</p>
                                    <Progress value={course.progress} className="mt-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { courseScores, CourseScoreType } from '@/lib/courseScores';
import { courses } from '@/lib/coursesDetails';
import { CourseModel, UserModel } from '@/lib/types';
import { router } from '@inertiajs/react';

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

export function CourseAreaInteractive({ user, allCourse }: { user: UserModel; allCourse: CourseModel[] }) {
    const handleAddMaterials = () => {
        router.visit(route('teacher.add.materials'));
    };
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
        .filter(Boolean) as MergedCourseType[];

    return (
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="mb-6 ml-4 flex flex-row items-center justify-between border-b pb-4 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100">
                {user.role == 'admin' ? (
                    <>
                        <h1>Manage Course</h1>
                    </>
                ) : (
                    <>
                        <h3>Your Course</h3>
                    </>
                )}

                {user.role == 'teacher' || user.role == 'admin' ? (
                    <>
                        <button
                            type="button"
                            className="cursor-pointer rounded-xl border bg-[#0097DA] px-2 py-2 text-sm text-white hover:bg-[#014769] dark:bg-[#0097DA] dark:hover:bg-[#014769]"
                            onClick={handleAddMaterials}
                        >
                            <a>Add Course</a>
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {allCourse.map((course) => (
                    <div key={course.id} className="relative">
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
                            className="flex h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
                        >
                            <CardContent className="flex h-full flex-col justify-between">
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.name}</h3>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="bg-gradient-to-r from-[#F2951B] to-[#FFD599] bg-clip-text font-medium text-transparent">
                                            ({course.id})
                                        </span>
                                    </p>
                                </div>

                                {user.role == 'teacher' || user.role == 'student' ? (
                                    <>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {course.description || 'No description provided for this course.'}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <div className="flex flex-row justify-center gap-2">
                                    <div className="flex justify-center">
                                        {user.role == 'admin' ? (
                                            <>
                                                <AlertDialog>
                                                    <AlertDialogTrigger
                                                        onClick={() => console.log('Remove course', course.id)}
                                                        className="mt-16 flex h-8 w-32 cursor-pointer items-center justify-center rounded-md bg-[#0097DA] text-sm font-bold text-white shadow-md hover:bg-[#014769] hover:text-white dark:text-white dark:hover:text-black"
                                                    >
                                                        Update Course
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Do you wish to update data inside this course? Updated data will be written in our
                                                                server.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => console.log('is deleted')}
                                                                className="cursor-pointer bg-[#0097DA] hover:bg-[#014769]"
                                                            >
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="flex justify-center">
                                        {user.role == 'admin' ? (
                                            <>
                                                <AlertDialog>
                                                    <AlertDialogTrigger
                                                        onClick={() => console.log('Remove course', course.id)}
                                                        className="mt-16 flex h-8 w-32 cursor-pointer items-center justify-center rounded-md bg-[#0097DA] text-sm font-bold text-white shadow-md hover:bg-[#014769] hover:text-white dark:text-white dark:hover:text-black"
                                                    >
                                                        Delete Course
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete course and remove course
                                                                data from our servers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => console.log('is deleted')}
                                                                className="cursor-pointer bg-[#F2951B] hover:bg-blue-800"
                                                            >
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

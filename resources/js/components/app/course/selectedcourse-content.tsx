import { Card, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import StudentCard from './card/studentcourse-Card';
import TeacherCard from './card/teachercourse-Card';
import { SessionPanel } from './panel/session-Panel';
import { CourseDescription } from './section/courseDescription';
import { forumContents, ForumContentType } from '@/lib/forumContent';
import { CourseModel, UserModel } from '@/lib/types';

interface SelectedCourseContentProps {
    auth: {
        user: UserModel;
    };
    course: CourseModel;
}

export default function SelectedCourseContent({ auth, course }: SelectedCourseContentProps) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === course.id);

    if (!forum) {
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {course.id}</h1>
            </div>
        );
    }

    return (
        <div className="mx-6 flex flex-col">
            <SessionPanel courseId={course.id} currentUrl={usePage().url} />
            <div className="my-6 flex flex-row gap-6">
                <CourseDescription forum={forum} />
                <Card className="h-fit w-full bg-white text-gray-900 shadow-lg lg:w-72 dark:bg-[#1c1c1c] dark:text-gray-100">
                    <CardContent className="space-y-4 p-6">
                        <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Things to do in this session</h3>

                        <nav className="flex flex-col gap-2 text-blue-600 dark:text-blue-400">
                            {auth.user.role === 'teacher' && <TeacherCard courseId={course.id} />}
                            {auth.user.role === 'student' && <StudentCard courseId={course.id} />}
                        </nav>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

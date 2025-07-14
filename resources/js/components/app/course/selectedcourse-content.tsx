import { Card, CardContent } from '@/components/ui/card';
import { ForumContentType, forumContents } from '@/lib/forumContent';
import { CourseDescription } from './section/courseDescription';
import LecturerCard from './card/lecturercourse-Card';
import StudentCard from './card/studentcourse-Card';

interface Props {
    role: 'student' | 'lecturer';
    courseId: string;
}

export default function SelectedCourseContent({ role, courseId }: Props) {
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
            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Empty Space */}
                <CourseDescription forum={forum} />
                {/* Bagian Card */}
                <Card className="h-fit w-full bg-white text-gray-900 shadow-lg lg:w-72 dark:bg-[#1c1c1c] dark:text-gray-100">
                    <CardContent className="space-y-4 p-6">
                        <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Things to do in this session</h3>

                        <nav className="flex flex-col gap-2 text-blue-600 dark:text-blue-400">
                            {role === 'lecturer' && <LecturerCard courseId={courseId} />}
                            {role === 'student' && <StudentCard courseId={courseId} />}
                        </nav>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

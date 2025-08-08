import { Card, CardContent } from '@/components/ui/card';
// import { forumContents, ForumContentType } from '@/lib/forumContent';
import { CourseModel, SessionType, UserModel } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import StudentCard from './card/studentcourse-Card';
import TeacherCard from './card/teachercourse-Card';
import { SessionPanel } from './panel/session-Panel';
import CourseDescriptionContents from './section/courseDescription';

interface Props {
    auth: {
        user: UserModel;
    };
    course: CourseModel;
    sessions: SessionType[];
}

export default function SessionsContents({ auth, course, sessions }: Props) {
    // const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === course.id);
    const { url } = usePage();

    return (
        <div className="mx-6 flex flex-col">
            <SessionPanel courseId={course.id} currentUrl={url} sessions={sessions} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {sessions.length === 0 ? <div className="col-span-full text-red-500">No sessions scheduled yet.</div> : <></>}
            </div>

            <div className="my-6 flex h-full flex-row items-center justify-between pr-4">
                <CourseDescriptionContents auth={auth} course={course} sessions={sessions} />
                <Card className="h-fit bg-[#F2951B] shadow-lg dark:bg-[#f2951b] dark:text-gray-100">
                    <CardContent className="w-[20vw] text-black">
                        <h3 className="mb-6 text-lg text-white font-semibold">Things to do in this session</h3>
                        <nav className="flex flex-col gap-2 text-blue-600 dark:text-blue-400">
                            {(auth.user.role === 'teacher' || auth.user.role === 'admin') && <TeacherCard courseId={course.id} />}
                            {auth.user.role === 'student' && <StudentCard courseId={course.id} />}
                        </nav>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

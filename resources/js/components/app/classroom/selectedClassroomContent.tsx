import { Card, CardContent } from '@/components/ui/card';
import { ClassesType, SessionType, UserModel } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import StudentCard from '../course/card/studentcourse-Card';
import TeacherCard from '../course/card/teachercourse-Card';
import { SessionPanel } from '../course/panel/session-Panel';
import { ForumDescription } from '../course/section/forumDescription';

interface Props {
    courseId: string;
    currentUser?: UserModel; // logged-in user
    classroom?: ClassesType;
    sessions: SessionType[];
    currentUrl: string;
}

interface PageProps {
    auth: {
        user: UserModel;
    };
    classroom: ClassesType;
    [key: string]: any;
}

export default function SelectedClassroomContent({ currentUrl, courseId, sessions, currentUser, classroom: classroomProp }: Props) {
    const { props } = usePage<PageProps>();
    const user = currentUser || props.auth.user;
    const classroom = classroomProp || props.classroom;
    const displaySessions: SessionType[] =
        sessions && sessions.length > 0
            ? sessions
            : Array.from({ length: 10 }, (_, i) => ({
                  id: `session-${i + 1}`, // string
                  title: `Session ${i + 1}`,
                  description: 'TBA',
                  schedule_date: new Date().toISOString(),
                  course_id: courseId,
                  classroom_id: 'TBA',
              }));
    const firstScheduleDate = displaySessions[0]?.schedule_date;

    // Parse safely
    const startDate = firstScheduleDate ? new Date(firstScheduleDate) : new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days

    // Format to readable string, e.g., "Mon, 19 Aug 2025"
    const formatOptions: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const startFormatted = startDate.toLocaleDateString('en-US', formatOptions);
    const endFormatted = endDate.toLocaleDateString('en-US', formatOptions);

    const sessionsProps = {
        forumTitle: 'input data',
        description: 'input data',
        learningOutcome: 'input data',
        subTopics: ['input data', 'input data', 'input data', 'input data'],
        lecturerName: 'input data',
        lecturerId: 'input data',
        courseName: classroom.name,
        courseId: courseId,
        classId: 'input data',
        link: 'input data',
        start: startFormatted,
        end: endFormatted,
    };

    return (
        <div className="flex flex-col justify-between">
            <div className="flex flex-row">
                <SessionPanel
                    courseId={courseId}
                    currentUrl={currentUrl}
                    sessions={
                        sessions && sessions.length > 0
                            ? sessions
                            : Array.from({ length: 10 }, (_, i) => ({
                                  id: `session-${i + 1}`, // string
                                  title: `Session ${i + 1}`,
                                  description: 'TBA', // required
                                  schedule_date: new Date().toISOString(), // required
                                  course_id: courseId, // required
                                  classroom_id: 'TBA', // required
                              }))
                    }
                />
            </div>
            <div className="flex flex-row justify-between">
                <div className="px-12 py-4">
                    <ForumDescription forum={sessionsProps} sessions={sessions} />
                </div>

                <div className="flex h-full flex-row justify-end p-6">
                    <Card className="h-full w-fit bg-[#F2951B] shadow-lg dark:bg-[#f2951b] dark:text-gray-100">
                        <CardContent className="h-full w-full text-black sm:w-80">
                            <h3 className="mb-6 text-lg font-semibold text-white">Things to do in this session</h3>
                            <nav className="flex flex-col gap-2 text-blue-600 dark:text-blue-400">
                                {(user.role === 'teacher' || user.role === 'admin') && <TeacherCard courseId={courseId} />}
                                {user.role === 'student' && <StudentCard courseId={courseId} />}
                            </nav>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

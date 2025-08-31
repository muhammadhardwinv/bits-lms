import SelectedClassroomContent from '@/components/app/classroom/selectedClassroomContent';
import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { ContentLayout } from '@/layouts/content-layout';
import { ClassesType, SessionType, UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    classroom: ClassesType;
    classroomId?: string;
    sessions: SessionType[];
    [key: string]: any;
}

const SelectedClassroom = () => {
    const { classroom, sessions, auth } = usePage<PageProps>().props;

    if (!classroom) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-red-600">Classroom not found.</h1>
            </div>
        );
    }

    // Dummy data tugas
    const assignments = [
        { title: 'Task #1: Introduction to React', completed: true },
        { title: 'Task #2: Inertia.js Basics', completed: false },
        { title: 'Task #3: API Integration', completed: false },
        { title: 'Task #4: UI Enhancements', completed: true },
    ];

    const completedCount = assignments.filter((a) => a.completed).length;
    const totalCount = assignments.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    return (
        <>
            <Head title={`${classroom.name}`} />
            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={classroom.id} courseName={classroom.name} />
                <SelectedClassroomContent
                    courseId={classroom.id}
                    sessions={sessions} // or however sessions are stored
                    currentUrl={usePage().url} // better than window.location.href
                />{' '}
            </ContentLayout>
        </>
    );
};

export default SelectedClassroom;

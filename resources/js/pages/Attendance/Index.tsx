import AttendanceContent from '@/components/app/attendance/attendance-content';
import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function Attendance() {
    const { auth, courseId } = usePage<PageProps>().props;
    return (
        <ContentLayout user={auth.user}>
            <Head title="Attendance" />;
            <CourseGradeTop courseId={courseId} />
            <AttendanceContent user={auth.user} />
        </ContentLayout>
    );
}

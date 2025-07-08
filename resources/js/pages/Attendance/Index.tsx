import { AttendanceContent } from '@/components/app/attendance/attendance-content';
import { CourseGradeTop } from '@/components/app/course/course-topPanel';
import ContentLayout from '@/layouts/content-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Attendance() {
    const { props } = usePage();
    const courseId = props.courseId as string;
    return (
        <ContentLayout>
            <Head title="Attendance" />;
            <CourseGradeTop courseId={courseId} />
            <AttendanceContent />
        </ContentLayout>
    );
}

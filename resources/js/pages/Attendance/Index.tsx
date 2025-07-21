import AttendanceContent from '@/components/app/attendance/attendance-content';
import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { TeacherLayout } from '@/layouts/content-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Attendance() {
    const { props } = usePage();
    const courseId = props.courseId as string;
    return (
        <TeacherLayout>
            <Head title="Attendance" />;
            <CourseGradeTop courseId={courseId} />
            <AttendanceContent />
        </TeacherLayout>
    );
}

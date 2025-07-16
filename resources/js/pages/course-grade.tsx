import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { CourseGradeContent } from '@/components/app/gradebook/coursegrade-content';
import ContentLayout from '@/layouts/content-layout';
import { Head, usePage } from '@inertiajs/react';

export default function CourseGrade() {
    const { props } = usePage();
    const courseId = props.courseId as string;

    return (
        <>
            <Head title="Course Grade" />
            <ContentLayout>
                {/* <CourseGradeHeader courseId={courseId} /> */}
                <CourseGradeTop courseId={courseId}/>
                <CourseGradeContent courseId={courseId} />
            </ContentLayout>
        </>
    );
}

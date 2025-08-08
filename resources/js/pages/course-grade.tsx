import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { CourseGradeContent } from '@/components/app/gradebook/coursegrade-content';
import { ContentLayout } from '@/layouts/content-layout';
import { CourseModel, UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    course: CourseModel;
    [key: string]: any;
}

export default function CourseGrade() {
    const { auth, course } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Course Grade" />
            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={course.id} courseName={course.name} />
                <CourseGradeContent course={course} />
            </ContentLayout>
        </>
    );
}

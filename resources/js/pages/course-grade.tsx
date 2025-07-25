import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { CourseGradeContent } from '@/components/app/gradebook/coursegrade-content';
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

export default function CourseGrade() {
    const { auth, courseId } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Course Grade" />
            <ContentLayout user={auth.user}>
                {/* <CourseGradeHeader courseId={courseId} /> */}
                <CourseGradeTop courseId={courseId} />
                <CourseGradeContent courseId={courseId} />
            </ContentLayout>
        </>
    );
}

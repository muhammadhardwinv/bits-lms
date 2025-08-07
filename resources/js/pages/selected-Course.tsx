import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import SelectedCourseContent from '@/components/app/course/selectedcourse-content';
import { ContentLayout } from '@/layouts/content-layout';
import { CourseModel, UserModel } from '@/lib/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core'; // ✅ THIS LINE
import { Head, usePage } from '@inertiajs/react';

interface PageProps extends InertiaPageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    course: CourseModel;
}

export default function SelectedCourse() {
    const { auth, courseId, course } = usePage<PageProps>().props;

    return (
        <>
            <Head title={course.name}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={courseId} />
                <SelectedCourseContent auth={auth} course={course} />
            </ContentLayout>
        </>
    );
}

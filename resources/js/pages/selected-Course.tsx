import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import SelectedCourseContent from '@/components/app/course/selectedcourse-content';
import { ContentLayout } from '@/layouts/content-layout';
import { useUserStore } from '@/lib/store/userStore';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function SelectedCourse() {
    const { auth, courseId } = usePage<PageProps>().props;

    const role = auth.user.role;
    console.log(role);

    return (
        <>
            <Head title={`${courseId}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={courseId} />
                <SelectedCourseContent auth={auth} courseId={courseId} />
            </ContentLayout>
        </>
    );
}

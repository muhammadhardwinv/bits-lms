import { CourseAreaInteractive } from '@/components/app/course/course-area-interactive';
import { ContentLayout } from '@/layouts/content-layout';
import { CourseModel, UserModel } from '@/lib/types';

import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    allCourse: CourseModel[];

    [key: string]: any;
}

export default function Courses() {
    const { auth, allCourse } = usePage<PageProps>().props;

    const role = auth.user.role;

    return (
        <>
            <Head title="Courses" />
            <ContentLayout user={auth.user}>
                {/* <h1>{allCourse}</h1> */}
                {/* <h1>anjing</h1> */}
                <CourseAreaInteractive user={auth.user} allCourse={allCourse} />
            </ContentLayout>
        </>
    );
}

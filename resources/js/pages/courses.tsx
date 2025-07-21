import { CourseAreaInteractive } from '@/components/app/course/course-area-interactive';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';

import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };

    [key: string]: any;
}

export default function Courses() {
    const { auth } = usePage<PageProps>().props;

    const role = auth.user.role;

    return (
        <>
            <Head title="Courses" />
            <ContentLayout user={auth.user}>
                <CourseAreaInteractive />
            </ContentLayout>
        </>
    );
}

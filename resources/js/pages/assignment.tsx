import AssignmentContent from '@/components/app/assignment/assignment-content';
import { ContentLayout } from '@/layouts/content-layout';
import { courses } from '@/lib/coursesDetails';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function Assignment() {
    const { auth, courseId } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Assignment" />
            <ContentLayout user={auth.user}>
                <AssignmentContent
                    title="Your Assignment"
                    items={courses}
                    icon={ClipboardList}
                    link={(assignment) => '#'}
                    courseId={courseId}
                    user={auth.user}
                />
            </ContentLayout>
        </>
    );
}

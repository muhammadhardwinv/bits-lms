import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import DiscussionContent from '@/components/app/discussion/discussion-content';
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

export default function Discussion() {
    const { auth, courseId } = usePage<PageProps>().props;

    return (
        <>
            <Head title={`Discussion - ${courseId}`} />
            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={courseId} />
                <DiscussionContent courseId={courseId} />
            </ContentLayout>
        </>
    );
}

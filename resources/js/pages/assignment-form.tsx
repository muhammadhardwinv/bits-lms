import AssignmentFormContent from '@/components/app/lecturerPage/assignmentFormContent';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function AssignmentForm() {

    const { auth, courseId } = usePage<PageProps>().props;

    return (
        <ContentLayout user={auth.user}>
            <AssignmentFormContent />
        </ContentLayout>
    );
}

import ClassroomContent from '@/components/app/classroom/classroomContent';
import { ContentLayout } from '@/layouts/content-layout';
import { ClassesType, UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    users: UserModel[];
    [key: string]: any;
}

export default function Classroom() {
    const { allClassrooms, auth } = usePage<{
        allClassrooms: ClassesType[];
        auth: { user: UserModel };
    }>().props;

    return (
        <>
            <Head title="Classrooms" />
            <ContentLayout user={auth.user}>
                <ClassroomContent />
            </ContentLayout>
        </>
    );
}

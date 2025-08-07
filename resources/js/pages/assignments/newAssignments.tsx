// resources/js/Pages/newAssignment.tsx

import NewAssignmentsContent from '@/components/app/assignment/newAssignmentsContent';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';

export default function NewAssignmentsPage({ user }: { user: UserModel }) {
    return (
        <>
            <Head title="Submit Assignment" />
            <ContentLayout user={user}>
                <NewAssignmentsContent />
            </ContentLayout>
        </>
    );
}

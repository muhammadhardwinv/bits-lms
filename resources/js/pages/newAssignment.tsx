// resources/js/Pages/newAssignment.tsx

import NewAssignmentContent from '@/components/app/assignment/input-newAssignment';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';

export default function NewAssignmentPage({ user }: { user: UserModel }) {
    return (
        <>
            <Head title="Submit Assignment" />
            <ContentLayout user={user}>
                <NewAssignmentContent />
            </ContentLayout>
        </>
    );
}

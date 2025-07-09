// resources/js/Pages/newAssignment.tsx

import NewAssignmentContent from '@/components/app/assignment/input-newAssignment';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function NewAssignmentPage() {
    return (
        <>
            <Head title="Submit Assignment" />
            <ContentLayout>
                <NewAssignmentContent />
            </ContentLayout>
        </>
    );
}

import NewAssignmentContent from '@/components/app/assignment/newAssignment-content';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function NewAssignmentForm() {
    return (
        <>
            <Head title="Assignment Form"></Head>
            <ContentLayout>
                <NewAssignmentContent />
            </ContentLayout>
        </>
    );
}

// resources/js/Pages/newAssignment.tsx

import NewAssignmentContent from '@/components/app/assignment/input-newAssignment';
import { TeacherLayout } from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function NewAssignmentPage() {
    return (
        <>
            <Head title="Submit Assignment" />
            <TeacherLayout>
                <NewAssignmentContent />
            </TeacherLayout>
        </>
    );
}

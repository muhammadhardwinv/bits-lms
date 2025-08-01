// resources/js/Pages/newAssignment.tsx

import EditAssignmentsContent from '@/components/app/assignment/editAssignmentsContent';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function NewAssignmentsPage({ user }: { user: UserModel }) {
    const [data, setDataState] = useState({
        title: '',
        description: '',
        courseId: '',
        classId: '',
        type: '',
        dueDate: '',
        link: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const setData = (field: string, value: string) => {
        setDataState((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Head title="Submit Assignment" />
            <ContentLayout user={user}>
                <EditAssignmentsContent data={data} errors={errors} setData={setData} />
            </ContentLayout>
        </>
    );
}

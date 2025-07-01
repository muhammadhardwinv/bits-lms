'use client';

import PerAssignmentContent from '@/components/perassignment-content';
import { usePage } from '@inertiajs/react';

// Match the types declared in perassignment-content.tsx
type Assignment = {
    title: string;
    description?: string;
    courseId: string;
    classId: string;
    type: string;
    dueDate: string;
};

type UserModel = {
    name: string;
    role: string;
};

export default function PerAssignment() {
    const { assignment, user } = usePage<{ assignment: Assignment; user: UserModel }>().props;

    const onSubmit = (data: { response: string; attachment: File | null }) => {
        console.log('Submitted data:', data);
    };

    const loading = false;
    const errors = {
        response: '',
        attachment: '',
    };

    return (
        <div className="mx-auto my-8 h-[90vh] w-[90vw] overflow-y-auto">
            <PerAssignmentContent assignment={assignment} user={user} onSubmit={onSubmit} loading={loading} errors={errors} />
        </div>
    );
}

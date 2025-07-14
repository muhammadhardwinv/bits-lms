import AssignmentContent from '@/components/app/assignment/assignment-content';
import ContentLayout from '@/layouts/content-layout';
import { courses as assignments } from '@/lib/coursesDetails';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

export default function Assignment() {
    const props = usePage().props as Partial<{ courseId: string }>;
    const courseId = props.courseId ?? ''; // ✅ Rename and default
    const [user] = useState<UserModel>({
        name: 'Chris',
        role: 'student',
    });

    return (
        <>
            <Head title="Assignment" />
            <ContentLayout>
                <AssignmentContent title="Your Assignment" items={assignments} icon={ClipboardList} link={(assignment) => '#'} courseId={courseId} />
            </ContentLayout>
        </>
    );
}

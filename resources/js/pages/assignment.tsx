import AssignmentContent from '@/components/app/assignment/assignment-content';
import ContentLayout from '@/layouts/content-layout';
import { courses as assignments } from '@/lib/coursesDetails';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

export default function Assignment() {
    const [user, setUser] = useState<UserModel>({
        name: 'Chris',
        role: 'student',
    });

    return (
        <>
            <Head title="Assignment" />
            <ContentLayout>
                <AssignmentContent
                    title="Your Assignment"
                    items={assignments}
                    icon={ClipboardList}
                    user={user}
                    link={(assignment) => assignment.link}
                />
            </ContentLayout>
        </>
    );
}

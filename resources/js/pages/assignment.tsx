import AssignmentContent from '@/components/assignment-content';
import ContentLayout from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { courses as assignments } from '@/lib/coursesDetails';

export default function Assignment() {
    const [user, setUser] = useState<UserModel>({
        name: 'Chris',
        role: 'student',
    });

    return (
        <>
            <Head title="Assignment ">
                <Link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
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

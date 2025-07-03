import ForumContent from '@/components/forum-content';
import ContentLayout from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    courseId: string;
}
export default function SelectedCourse({ courseId }: Props) {
    const [user, setUser] = useState<UserModel>({
        name: 'Beckham',
        role: 'lecturer',
        // role: 'student',
    });

    return (
        <>
            <Head title={`${courseId}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <ContentLayout>
                <ForumContent user={user} courseId={courseId} />
            </ContentLayout>
        </>
    );
}

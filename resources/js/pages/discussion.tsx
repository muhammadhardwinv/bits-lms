import DiscussionContent from '@/components/discussion-content';
import ContentLayout from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';

interface Props {
    user: UserModel;
    courseId: string;
}

export default function Discussion({ user, courseId }: Props) {
    return (
        <>
            <Head title={`${courseId}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <DiscussionContent user={user} courseId={courseId} />
            </ContentLayout>
        </>
    );
}

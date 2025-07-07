import DiscussionContent from '@/components/app/discussion/discussion-content';
import ContentLayout from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';

interface Props {
    user?: UserModel;
    courseId: string;
}

export default function Discussion({ user, courseId }: Props) {
    return (
        <>
            <Head title={`Discussion - ${courseId}`} />
            <ContentLayout>
                {/* Option 1: If DiscussionContent expects user as a prop */}
                <DiscussionContent user={user} courseId={courseId} />

                {/* Option 2: If DiscussionContent uses useUserStore internally, use this instead:
        <DiscussionContent courseId={courseId} />
        */}
            </ContentLayout>
        </>
    );
}

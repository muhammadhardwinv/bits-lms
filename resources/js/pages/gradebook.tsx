import GradebookPage from '@/components/app/gradebook/gradebook-content';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';

interface GradebookProps {
    user: UserModel;
    courseId: string;
}

export default function Gradebook({ user, courseId }: GradebookProps) {
    return (
        <>
            <Head title="Gradebook" />
            <ContentLayout user={user}>
                <div>
                    {/* <GradebookContentHeader /> */}
                    <div className="flex items-center justify-center">
                        <GradebookPage />
                    </div>
                </div>
            </ContentLayout>
        </>
    );
}

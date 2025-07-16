import GradebookPage from '@/components/app/gradebook/gradebook-content';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

interface GradebookProps {
    courseId: string;
}

export default function Gradebook({ courseId }: GradebookProps) {
    return (
        <>
            <Head title="Gradebook" />
            <ContentLayout>
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

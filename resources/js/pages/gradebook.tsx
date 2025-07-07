import { GradebookContentCourse, GradebookContentHeader } from '@/components/app/gradebook/gradebook-content';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function Gradebook() {
    return (
        <>
            <Head title="Gradebook" />
            <ContentLayout>
                <div className="">
                    <div className="flex items-center justify-center">
                        <GradebookContentHeader />
                    </div>
                    <div className="flex items-center justify-center">
                        <GradebookContentCourse />
                    </div>
                </div>
            </ContentLayout>
        </>
    );
}

import { CourseAreaInteractive } from '@/components/course-area-interactive';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function Courses() {
    return (
        <>
            <Head title="Courses" />
            <ContentLayout>
                <CourseAreaInteractive />
            </ContentLayout>
        </>
    );
}

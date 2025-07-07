import SelectedCourseContent from '@/components/app/course/selectedcourse-content';
import ContentLayout from '@/layouts/content-layout';
import { useUserStore } from '@/lib/store/userStore';
import { Head } from '@inertiajs/react';

interface Props {
    courseId: string;
}

export default function SelectedCourse({ courseId }: Props) {
    const { role } = useUserStore(); // ✅ Correct key from Zustand store

    return (
        <>
            <Head title={`${courseId}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <ContentLayout>
                <SelectedCourseContent role={role} courseId={courseId} />
            </ContentLayout>
        </>
    );
}

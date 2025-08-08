import AssignmentsContent from '@/components/app/assignment/baseAssignmentsContents';
import { ContentLayout } from '@/layouts/content-layout';
import { courses, CourseType } from '@/lib/coursesDetails';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function PerAssignmentPage() {
    const { auth, courseId } = usePage<PageProps>().props;

    const course: CourseType | undefined = courses.find((c) => c.courseId === courseId);

    if (!course) {
        return <p className="mt-6 text-center text-red-600">Assignment not found.</p>;
    }

    const onSubmit = (data: { response: string; attachment: File | null }) => {
        console.log('Submitted:', data);
    };

    return (
        <>
            {/* ✅ Dynamic title */}
            <Head title={course.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <ContentLayout user={auth.user}>
                <AssignmentsContent assignment={course} user={auth.role} onSubmit={onSubmit} loading={false} errors={{}} />
            </ContentLayout>
        </>
    );
}

import PerAssignmentContent from '@/components/app/assignment/perassignment-content';
import { StudentLayout } from '@/layouts/content-layout';
import { courses, CourseType } from '@/lib/coursesDetails';
import { Head, usePage } from '@inertiajs/react';

type Props = {
    courseId: string;
};

export default function PerAssignmentPage() {
    const { courseId } = usePage<Props>().props;

    // ✅ Use ONLY ONE course declaration
    const course: CourseType | undefined = courses.find((c) => c.courseId === courseId);

    if (!course) {
        return <p className="mt-6 text-center text-red-600">Assignment not found.</p>;
    }

    const user = {
        name: 'Jane Doe',
        role: 'student',
    };

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

            <StudentLayout>
                <PerAssignmentContent assignment={course} user={user} onSubmit={onSubmit} loading={false} errors={{}} />
            </StudentLayout>
        </>
    );
}

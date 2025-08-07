import AssignmentsContent from '@/components/app/assignment/baseAssignmentsContents';
import { ContentLayout } from '@/layouts/content-layout';
import { AssignmentsModel, CourseModel, UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    allCourse: CourseModel[];
    assignments?: AssignmentsModel[];
    [key: string]: any;
}

export default function Assignments() {
    const { auth, allCourse, assignments = [] } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Assignments" />
            <ContentLayout user={auth.user}>
                <AssignmentsContent
                    title="Your Assignments"
                    items={assignments}
                    icon={ClipboardList}
                    link={(a) => a.link}
                    allCourse={allCourse}
                    user={auth.user}
                />
            </ContentLayout>
        </>
    );
}

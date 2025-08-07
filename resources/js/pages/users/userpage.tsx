import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import PeopleContent from '@/components/app/people/people-content';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function People() {
    const { auth, courseId } = usePage<PageProps>().props;
    const role = auth.user.role;

    return (
        <ContentLayout user={auth.user}>
            {/* <CourseGradeTop courseId={courseId} /> */}

            <CourseGradeTop courseId="SCI-4321" />
            {/* <h3 className='text-4xl'>Ini contoh aja pake SCI-4321</h3> */}
            <PeopleContent />
        </ContentLayout>
    );
}

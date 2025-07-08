import { CourseGradeTop } from '@/components/app/course/course-topPanel';
import PeopleContent from '@/components/app/people/people-content';
import ContentLayout from '@/layouts/content-layout';
import { usePage } from '@inertiajs/react';

export default function People() {
    const { props } = usePage();
    const courseId = props.courseId as string;
    return (
        <ContentLayout>
            <CourseGradeTop courseId={courseId} />
            <PeopleContent />
        </ContentLayout>
    );
}

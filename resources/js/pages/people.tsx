import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import PeopleContent from '@/components/app/people/people-content';
import { StudentLayout } from '@/layouts/content-layout';
import { usePage } from '@inertiajs/react';

export default function People() {
    const { props } = usePage();
    const courseId = props.courseId as string;
    return (
        <StudentLayout>
            <CourseGradeTop courseId={courseId} />
            <PeopleContent />
        </StudentLayout>
    );
}

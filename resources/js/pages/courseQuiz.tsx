import CourseQuizContent from '@/components/app/course/quiz/courseQuizContent';
import { StudentLayout } from '@/layouts/content-layout';
import { CourseType, courses } from '@/lib/coursesDetails';
import { Head, usePage } from '@inertiajs/react';

export default function CourseQuiz() {
    const { courseId } = usePage<{ courseId: string }>().props;

    const course: CourseType | undefined = courses.find((c) => c.courseId === courseId);

    return (
        <>
            <Head title={`Quiz – ${course?.courseName ?? 'Course'}`} />
            <StudentLayout>{course && <CourseQuizContent courseId={course.courseId} courseName={course.courseName} />}</StudentLayout>
        </>
    );
}

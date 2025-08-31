import CourseQuizContent from '@/components/app/course/quiz/courseQuizContent';
import { ContentLayout } from '@/layouts/content-layout';
import { CourseType, courses } from '@/lib/coursesDetails';
import { forumContents, ForumContentType } from '@/lib/forumContent';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}


export default function CourseQuiz(forum: ForumContentType) {
    // const { courseId } = usePage<{ courseId: string }>().props;
    const { auth, courseId } = usePage<PageProps>().props;

    const course: CourseType | undefined = courses.find((c) => c.courseId === courseId);

    return (
        <>
            <Head title={`Quiz – ${course?.courseName ?? 'Course'}`} />
            <ContentLayout user={auth.user}>
                {/* {course && <CourseQuizContent courseId={course.courseId} courseName={course.courseName} />} */}
                <CourseQuizContent forum={forumContents[0]}/>
            </ContentLayout>
        </>
    );
}

import SessionsContents from '@/components/app/course/courseSessionContent';
import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { ContentLayout } from '@/layouts/content-layout';
import { ClassesType, CourseModel, SessionType, UserModel } from '@/lib/types';
import { PageProps as InertiaPageProps, router } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';
import { Content } from '@radix-ui/react-dialog';

interface PageProps extends InertiaPageProps {
    auth: { user: UserModel };
    course: CourseModel;
    classes: ClassesType;
    courseId: string;
    courseSessions: SessionType[];
}

export default function CourseSessions() {
    const { auth, course, courseSessions, classes, courseId } = usePage<PageProps>().props;

    if (!course) return <div>Loading course...</div>;
    if (!courseSessions) {
        return (
            <ContentLayout user={auth.user}>
                <div className="flex h-full w-full flex-col items-center justify-center pb-30 text-center">
                    <h2 className="mb-6 text-4xl font-black text-gray-500 dark:text-white">
                        Sessions for {course.name ?? 'unknown'} - {course.id} not found.
                    </h2>
                    <p className="mb-10 text-gray-500 dark:text-white">Please contact your administrator!</p>
                    {(auth.user.role === 'admin' || auth.user.role === 'teacher') && (
                        <button
                            onClick={() => router.visit(`/course/${courseId}/create`)}
                            className="inline-block cursor-pointer rounded-xl bg-[#f2951b] px-6 py-3 font-black text-white hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-[#014769]"
                        >
                            Create New Session
                        </button>
                    )}
                </div>
            </ContentLayout>
        );
    }

    return (
        <>
            <Head>
                <title>{course.name}</title>
            </Head>

            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={course.id} courseName={course.name} />
                <SessionsContents auth={auth} course={course} courseSessions={courseSessions} classes={classes} />{' '}
            </ContentLayout>
        </>
    );
}

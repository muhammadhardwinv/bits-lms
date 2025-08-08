import SessionsContents from '@/components/app/course/courseSessionContent';
import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import { ContentLayout } from '@/layouts/content-layout';
import { CourseModel, SessionType, UserModel } from '@/lib/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';

interface PageProps extends InertiaPageProps {
    auth: {
        user: UserModel;
    };
    course: CourseModel;
    sessions: SessionType[];
}

export default function CourseSessions() {
    const { auth, course, sessions } = usePage<PageProps>().props;
    if (sessions === undefined || sessions === null) {
        return <div>Loading sessions...</div>;
    }

    if (sessions.length === 0) {
        return (
            <div>
                <ContentLayout user={auth.user}>
                    <div className="flex h-full w-full flex-col items-center justify-center pb-30 text-center">
                        <h2 className="mb-6 text-4xl font-black text-gray-500 dark:text-white">Session for {course?.id ?? 'unknown'} not found.</h2>
                        <p className="mb-10 text-gray-500 dark:text-white">Please contact your administrator!</p>
                        {(auth.user.role === 'admin' || auth.user.role === 'teacher') && (
                            <a
                                href={route('sessions.create', { course: course.id })}
                                className="inline-block rounded rounded-xl bg-[#f2951b] px-6 py-3 font-black text-white hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-[#014769]"
                            >
                                New Session
                            </a>
                        )}
                    </div>
                </ContentLayout>
            </div>
        );
    }
    return (
        <>
            <Head title={course.name}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <ContentLayout user={auth.user}>
                <CourseGradeTop courseId={course.id} courseName={course.name} />

                <SessionsContents auth={auth} course={course} sessions={sessions} />
            </ContentLayout>
        </>
    );
}

import { CourseGradeTop } from '@/components/app/course/panel/course-topPanel';
import DiscussionContent from '@/components/app/discussion/discussion-content';
import { StudentLayout } from '@/layouts/content-layout';
import { useUserStore } from '@/lib/store/userStore';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';

interface Props {
    user?: UserModel;
    courseId: string;
}

export default function Discussion({ user, courseId }: Props) {
    const role = useUserStore((state) => state.role);
    const isHydrated = useUserStore.persist.hasHydrated();

    if (!isHydrated) {
        return (
            <StudentLayout>
                <p className="text-center text-sm text-gray-500">Loading user data...</p>
            </StudentLayout>
        );
    }

    if (!role) {
        return (
            <StudentLayout>
                <p className="text-center text-red-500">❌ User role not found. Please log in again.</p>
            </StudentLayout>
        );
    }

    return (
        <>
            <Head title={`Discussion - ${courseId}`} />
            <StudentLayout>
                <CourseGradeTop courseId={courseId} />
                <DiscussionContent courseId={courseId} />
            </StudentLayout>
        </>
    );
}

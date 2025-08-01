import { router } from '@inertiajs/react';
import {
    BoxIcon,
    ClipboardList,
    LayoutDashboardIcon,
    LayoutList,
    LibraryBig,
    MessageSquareText,
    MessagesSquare,
    User,
    UserRoundCheck,
} from 'lucide-react';

export function redirectRoutes(courses: { courseId: string }[]) {
    if (courses.length > 0) {
        const firstCourseId = courses[0].courseId;
        router.visit(`/discussion/${firstCourseId}`);
    }
}
export const AdminNavItems = [
    { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboardIcon },
    { title: 'Add User', url: '/admin/users/create', icon: User },
    { title: 'Add Course', url: '/admin/courses/create', icon: BoxIcon },
];
4;

export const TeacherNavItems = [
    { title: 'Dashboard', url: '/teacher/dashboard', icon: LayoutList },
    { title: 'Discussion', url: '/discussion/SCI-4321', icon: LibraryBig },
    { title: 'Courses', url: '/courses', icon: BoxIcon },
    { title: 'Assignment', url: '/assignment', icon: ClipboardList },
    { title: 'People', url: '/people/SCI-4321', icon: User },
    { title: 'Attendance', url: '/attendance/SCI-4321', icon: UserRoundCheck },
];

export const StudentNavItems = [
    { title: 'Dashboard', url: '/student/dashboard', icon: LayoutList },
    { title: 'Discussion', url: '/discussion/SCI-4321', icon: MessageSquareText },
    { title: 'Courses', url: '/courses', icon: BoxIcon },
    { title: 'Assignment', url: '/assignment', icon: ClipboardList },
    { title: 'People', url: '/people/SCI-4321', icon: User },
    { title: 'Attendance', url: '/attendance/SCI-4321', icon: UserRoundCheck },
];

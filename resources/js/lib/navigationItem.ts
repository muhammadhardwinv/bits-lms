import { router } from '@inertiajs/react';
import {
    BookOpen,
    BoxIcon,
    ClipboardList,
    Goal,
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
    { title: 'Manage User', url: '/admin/users/', icon: User },
    { title: 'Manage Course', url: '/courses', icon: BookOpen },
    { title: 'Manage Classroom ', url: '/admin/classroom/', icon: Goal },
];
4;

export const TeacherNavItems = [
    { title: 'Dashboard', url: '/teacher/dashboard', icon: LayoutList },
    { title: 'Discussion', url: '/discussion/', icon: LibraryBig },
    { title: 'Courses', url: '/courses', icon: BoxIcon },
    { title: 'Assignments', url: '/assignments', icon: ClipboardList },
    { title: 'People', url: '/people/', icon: User },
    { title: 'Attendance', url: '/attendance/', icon: UserRoundCheck },
];

export const StudentNavItems = [
    { title: 'Dashboard', url: '/student/dashboard', icon: LayoutList },
    { title: 'Discussion', url: '/discussion/', icon: MessageSquareText },
    { title: 'Courses', url: '/courses', icon: BoxIcon },
    { title: 'Assignments', url: '/assignments', icon: ClipboardList },
    { title: 'People', url: '/people/', icon: User },
    { title: 'Attendance', url: '/attendance/', icon: UserRoundCheck },
];

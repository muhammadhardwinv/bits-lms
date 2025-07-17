import { BoxIcon, LayoutDashboardIcon, User } from 'lucide-react';

export const AdminNavItems = [
    { title: 'Dashboard admdin', url: '/dashboard', icon: LayoutDashboardIcon },
    { title: 'Add User', url: 'admin.user.create', icon: User },
    { title: 'Add Materials', url: 'admin.add.materials', icon: BoxIcon },
];

export const TeacherNavItems = [
    { title: 'D teacher', url: '/dashboard', icon: LayoutDashboardIcon },
    { title: 'Add User', url: 'admin.user.create', icon: User },
    { title: 'Add Materials', url: 'admin.add.materials', icon: BoxIcon },
];

export const StudentNavItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
    { title: 'Add User', url: 'admin.user.create', icon: User },
    { title: 'Add Materials', url: 'admin.add.materials', icon: BoxIcon },
];

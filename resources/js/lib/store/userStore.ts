// stores/userStore.ts

import { AdminNavItems, StudentNavItems, TeacherNavItems } from '@/lib/navigationItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RoleType = 'student' | 'teacher' | 'admin';

export interface UserClass {
    courseName: string;
    courseId: string;
    classId: string;
}

export interface NavItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

interface UserStore {
    name: string;
    role?: RoleType;
    courseId?: string;
    classes?: UserClass[];
    navItems: NavItem[];
    setName: (name: string) => void;
    setRole: (role: RoleType) => void;
    setUser: (user: { name: string; role: RoleType; courseId?: string; classes?: UserClass[] }) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            name: '',
            role: undefined,
            courseId: undefined,
            classes: [],
            navItems: [],

            setName: (name) => set({ name }),

            setRole: (role) => {
                let items: NavItem[] = role === 'admin' ? AdminNavItems : role === 'teacher' ? TeacherNavItems : StudentNavItems;

                set({ role, navItems: items });
            },

            setUser: ({ name, role, courseId, classes }) => {
                let items: NavItem[] = role === 'admin' ? AdminNavItems : role === 'teacher' ? TeacherNavItems : StudentNavItems;

                set({
                    name,
                    role,
                    courseId,
                    classes: classes ?? [],
                    navItems: items,
                });
            },

            clearUser: () =>
                set({
                    name: '',
                    role: undefined,
                    courseId: undefined,
                    classes: [],
                    navItems: [],
                }),
        }),
        {
            name: 'user-storage',
        },
    ),
);

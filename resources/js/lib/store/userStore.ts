import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RoleType = 'student' | 'lecturer' | 'admin';

export interface UserClass {
    courseName: string;
    courseId: string;
    classId: string;
}

interface UserStore {
    name: string;
    role?: RoleType;
    courseId?: string;
    classes?: UserClass[];
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
            setName: (name) => set({ name }),
            setRole: (role) => set({ role }),
            setUser: (user) =>
                set({
                    name: user.name,
                    role: user.role,
                    courseId: user.courseId,
                    classes: user.classes ?? [],
                }),
            clearUser: () =>
                set({
                    name: '',
                    role: undefined,
                    courseId: undefined,
                    classes: [],
                }),
        }),
        {
            name: 'user-storage', // localStorage key
        },
    ),
);

import { create } from 'zustand';

export type RoleType = 'student' | 'lecturer';

interface UserStore {
    name: string;
    role: RoleType;
    setName: (name: string) => void;
    setRole: (role: RoleType) => void;
    setUser: (user: { name: string; role: RoleType }) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    name: '',
    role: 'student', // default role
    setName: (name) => set({ name }),
    setRole: (role) => set({ role }),
    setUser: (user) => set({ name: user.name, role: user.role }),
}));

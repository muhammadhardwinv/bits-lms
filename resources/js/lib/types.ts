export type UserModel = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
};

export interface CourseModel {
    id: string;
    name: string;
    description: string;
    teacher_id: string;
    course_code: string | null;
    credits: number;
    schedule: string | null; // ISO date string, can be NULL
    max_students: number;
    status: 'active' | 'inactive'; // match your DB values
    created_at: string | null; // ISO string
    updated_at: string | null; // ISO string
}

export interface SessionType {
    id: string;
    title: string;
    description?: string;
    schedule_date?: string;
    course_id?: string;
    classes_id?: string;
    lecturer_name?: string;
    lecturer_id?: string;
    slides?: string[]; // <-- add this
}

export type ClassesType = {
    id: string;
    name: string;
    course_id: string;
    teacher_id: string;
    teacher?: UserModel;
};

export type AssignmentsModel = {
    title: string;
    id: string;
    description?: string;
    course_id: string;
    session_id: string;
    attempt_limit: string;
    due_date: string;
    link: string;
};

export type Semester = {
    id: string;
    name: string; // e.g., "Semester 1"
    academicYear: string; // e.g., "2025/2026"
    startDate: string; // "YYYY-MM-DD"
    endDate: string; // "YYYY-MM-DD"
    isActive: boolean;
};
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
}

export type SessionType = {
    id: string;
    title: string;
    course_id: string;
    description: string;
    schedule_date: string;
};

export type ClassroomType = {
    id: string;
    name: string;
    course_id: string;
    teacher_id: string;
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
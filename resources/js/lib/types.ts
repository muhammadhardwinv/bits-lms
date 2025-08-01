export type UserModel = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
};

export type CourseModel = {
    id: string;
    name: string;
    description: string;
    teacher_id: string;
};

export type AssignmentsModel = {
    title: string;
    description?: string;
    courseId: string;
    session_id: string;
    type: string;
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
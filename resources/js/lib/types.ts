export type UserModel = {
    name: string;
    role: 'student' | 'lecturer';
    classes?: {
        courseName: string;
        courseId: string;
        classId: string;
    }[];
};

export type Assignment = {
    title: string;
    description?: string;
    courseId: string;
    classId: string;
    type: string;
    dueDate: string;
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
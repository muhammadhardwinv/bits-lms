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

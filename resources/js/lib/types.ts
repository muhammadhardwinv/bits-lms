export type UserModel = {
    name: string;
    role: string;
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

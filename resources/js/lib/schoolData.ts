// schoolData.ts

// 1. Core Types
export type Course = {
    name: string;
    classId: string;
    courseId: string;
    teacherId: string;
    subjectId: string;
    description: string;
    schedule: { day: string; time: string }[];
    credits: number;
    semesterId: string;
    createdAt: string;
};

export type Subject = {
    id: string;
    name: string;
    code: string;
};

export type Semester = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    schoolYearId: string;
};

export type SchoolYear = {
    id: string;
    year: string;
    isCurrent: boolean;
};

export type Teacher = {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    office: string;
};

export type Student = {
    id: string;
    name: string;
    classId: string;
    email: string;
    enrolledCourses: string[];
    parentId: string;
    joinedAt: string;
};

export type Parent = {
    id: string;
    name: string;
    email: string;
    phone: string;
    studentIds: string[];
};

// 2. Academic Content
export type Assignment = {
    id: string;
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    createdAt: string;
};

export type AssignmentSubmission = {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: string;
    fileUrl: string;
    isLate: boolean;
    grade?: number;
};

export type Quiz = {
    id: string;
    courseId: string;
    title: string;
    totalQuestions: number;
    passingScore: number;
    scheduledAt: string;
};

export type QuizAttempt = {
    id: string;
    quizId: string;
    studentId: string;
    attemptedAt: string;
    score: number;
    passed: boolean;
};

export type Exam = {
    id: string;
    courseId: string;
    type: 'Midterm' | 'Final';
    date: string;
    totalMarks: number;
};

export type Grade = {
    studentId: string;
    courseId: string;
    type: 'Assignment' | 'Quiz' | 'Midterm' | 'Final';
    referenceId: string;
    score: number;
    gradedAt: string;
};

export type Attendance = {
    studentId: string;
    courseId: string;
    date: string;
    attendanceType: 'Present' | 'Absent' | 'Late' | 'Excused';
};

// 3. Communication
export type Notification = {
    id: string;
    userId: string;
    message: string;
    read: boolean;
    sentAt: string;
};

export type Announcement = {
    id: string;
    title: string;
    content: string;
    postedBy: string; // teacherId or adminId
    targetClassIds: string[];
    createdAt: string;
};

export type DiscussionThread = {
    id: string;
    courseId: string;
    createdBy: string;
    topic: string;
    createdAt: string;
};

export type DiscussionPost = {
    id: string;
    threadId: string;
    authorId: string;
    content: string;
    createdAt: string;
};

// 4. Dummy Data Examples

export const schoolYears: SchoolYear[] = Array.from({ length: 30 }, (_, i) => ({
    id: `SY-${2025 - i}`,
    year: `${2025 - i}/${2026 - i}`,
    isCurrent: i === 0,
}));

export const semesters: Semester[] = Array.from({ length: 30 }, (_, i) => ({
    id: `SEM-${i + 1}`,
    name: `Semester ${i + 1}`,
    startDate: `2025-01-01`,
    endDate: `2025-06-30`,
    schoolYearId: `SY-${2025 - (i % 5)}`,
}));

export const subjects: Subject[] = [
    { id: 'SUB-01', name: 'Mathematics', code: 'MATH' },
    { id: 'SUB-02', name: 'Physics', code: 'PHYS' },
    { id: 'SUB-03', name: 'Chemistry', code: 'CHEM' },
    { id: 'SUB-04', name: 'Biology', code: 'BIO' },
    { id: 'SUB-05', name: 'English Literature', code: 'ENG' },
    { id: 'SUB-06', name: 'History', code: 'HIST' },
    { id: 'SUB-07', name: 'Geography', code: 'GEO' },
    { id: 'SUB-08', name: 'Computer Science', code: 'CS' },
    { id: 'SUB-09', name: 'Economics', code: 'ECON' },
    { id: 'SUB-10', name: 'Sociology', code: 'SOC' },
    { id: 'SUB-11', name: 'Psychology', code: 'PSY' },
    { id: 'SUB-12', name: 'Art', code: 'ART' },
    { id: 'SUB-13', name: 'Music', code: 'MUS' },
    { id: 'SUB-14', name: 'Physical Education', code: 'PE' },
    { id: 'SUB-15', name: 'Philosophy', code: 'PHIL' },
    { id: 'SUB-16', name: 'Business Studies', code: 'BUS' },
    { id: 'SUB-17', name: 'Accounting', code: 'ACC' },
    { id: 'SUB-18', name: 'Law', code: 'LAW' },
    { id: 'SUB-19', name: 'Political Science', code: 'POL' },
    { id: 'SUB-20', name: 'Environmental Science', code: 'ENV' },
    { id: 'SUB-21', name: 'Engineering Fundamentals', code: 'ENGF' },
    { id: 'SUB-22', name: 'Information Technology', code: 'IT' },
    { id: 'SUB-23', name: 'Statistics', code: 'STAT' },
    { id: 'SUB-24', name: 'Astronomy', code: 'ASTRO' },
    { id: 'SUB-25', name: 'Media Studies', code: 'MEDIA' },
    { id: 'SUB-26', name: 'Drama', code: 'DRAMA' },
    { id: 'SUB-27', name: 'Health Education', code: 'HE' },
    { id: 'SUB-28', name: 'Design and Technology', code: 'DT' },
    { id: 'SUB-29', name: 'International Relations', code: 'IR' },
    { id: 'SUB-30', name: 'Linguistics', code: 'LING' },
];

export const parents: Parent[] = Array.from({ length: 30 }, (_, i) => ({
    id: `P-${(i + 1).toString().padStart(2, '0')}`,
    name: `Parent ${i + 1}`,
    email: `parent${i + 1}@parent.edu`,
    phone: `08123${(1000000 + i).toString()}`,
    studentIds: [`S-${(i + 1).toString().padStart(2, '0')}`],
}));

export const students: Student[] = Array.from({ length: 30 }, (_, i) => ({
    id: `S-${(i + 1).toString().padStart(2, '0')}`,
    name: `Student ${i + 1}`,
    classId: `X-${((i % 3) + 1).toString().padStart(2, '0')}`,
    email: `student${i + 1}@student.edu`,
    enrolledCourses: [`COURSE-${(i % 10) + 1}`],
    parentId: `P-${(i + 1).toString().padStart(2, '0')}`,
    joinedAt: `2024-07-${((i % 28) + 1).toString().padStart(2, '0')}`,
}));

export const teachers: Teacher[] = Array.from({ length: 30 }, (_, i) => ({
    id: `T-${(i + 1).toString().padStart(2, '0')}`,
    name: `Teacher ${i + 1}`,
    email: `teacher${i + 1}@school.edu`,
    phone: `08213${(1000000 + i).toString()}`,
    department: `Department ${(i % 5) + 1}`,
    office: `Building ${(i % 3) + 1}, Room ${(i % 10) + 100}`,
}));

export const courses: Course[] = Array.from({ length: 30 }, (_, i) => {
    const subject = subjects[i % subjects.length];
    return {
        name: `${subject.name} - Advanced Level`,
        classId: `X-${((i % 3) + 1).toString().padStart(2, '0')}`,
        courseId: `COURSE-${i + 1}`,
        teacherId: `T-${((i % 30) + 1).toString().padStart(2, '0')}`,
        subjectId: subject.id,
        description: `An in-depth study of ${subject.name} including theoretical and practical applications.`,
        schedule: [{ day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i % 5], time: `${8 + (i % 5)}:00 - ${9 + (i % 5)}:30` }],
        credits: 3,
        semesterId: `SEM-${(i % 30) + 1}`,
        createdAt: `2025-01-${((i % 28) + 1).toString().padStart(2, '0')}`,
    };
});

import { CourseType } from './coursesDetails';

type TickLesson = { ticks: boolean[] };

export type CourseScoreType = {
    courseId: CourseType['courseId'];
    classId: CourseType['classId'];
    score: number;
    lessons: TickLesson[];
    progress: number;
    maxScore?: number;
    gradedAt?: string;
    remarks?: string;
};

// Progress calculation function
function calculateProgress(lessons: TickLesson[]): number {
    const totalTicks = 60 * 5; // total across all courses
    const unitProgress = 180 / totalTicks;

    let completed = 0;
    lessons.forEach((lesson) => {
        completed += lesson.ticks.filter(Boolean).length;
    });

    return parseFloat((completed * unitProgress).toFixed(1));
}

// Simulated lesson data (use actual mockCourses if separate)
const lessonPresets: TickLesson[][] = [
    Array(10).fill({ ticks: [true, true, false, false, false] }),
    Array(10).fill({ ticks: [true, false, false, false, true] }),
    Array(10).fill({ ticks: [false, false, true, false, false] }),
    Array(10).fill({ ticks: [true, true, true, true, true] }),
    Array(10).fill({ ticks: [false, false, false, false, false] }),
    Array(10).fill({ ticks: [true, true, true, true, true] }),
];

export const courseScores: CourseScoreType[] = [
    {
        courseId: 'SCI-4321',
        classId: 'XII-Science-1',
        score: 92,
        lessons: lessonPresets[0],
        progress: calculateProgress(lessonPresets[0]),
        maxScore: 100,
        gradedAt: '2025-07-03',
        remarks: 'Excellent understanding of chemical waste impact.',
    },
    {
        courseId: 'BIO-2201',
        classId: 'XI-Biology-2',
        score: 85,
        lessons: lessonPresets[1],
        progress: calculateProgress(lessonPresets[1]),
    },
    {
        courseId: 'GEO-3010',
        classId: 'X-Geography-1',
        score: 78,
        lessons: lessonPresets[2],
        progress: calculateProgress(lessonPresets[2]),
    },
    {
        courseId: 'CHEM-1103',
        classId: 'X-Chem-1',
        score: 90,
        lessons: lessonPresets[3],
        progress: calculateProgress(lessonPresets[3]),
    },
    {
        courseId: 'BIO-3302',
        classId: 'XI-Biology-3',
        score: 88,
        lessons: lessonPresets[4],
        progress: calculateProgress(lessonPresets[4]),
    },
    {
        courseId: 'PHY-2502',
        classId: 'XI-Physics-2',
        score: 81,
        lessons: lessonPresets[5],
        progress: calculateProgress(lessonPresets[5]),
    },
];

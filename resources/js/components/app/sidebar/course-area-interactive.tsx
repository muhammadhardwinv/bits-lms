'use client';

import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { Progress } from '@/components/ui/progress';

type Lesson = { ticks: boolean[] };
type Course = { lessons: Lesson[] };
type AllCourses = Course[];

type CourseInfo = {
    name: string;
    classId: string;
    courseId: string;
    description: string;
};

function calculateProgress(courses: AllCourses): number {
    const totalLessons = 60;
    const ticksPerLesson = 5;
    const totalTicks = totalLessons * ticksPerLesson;
    const progressPerTick = 180 / totalTicks;
    let tickCount = 0;

    for (const course of courses) {
        for (const lesson of course.lessons) {
            for (const ticked of lesson.ticks) {
                if (ticked) tickCount++;
            }
        }
    }

    return parseFloat((tickCount * progressPerTick).toFixed(1));
}

const highSchoolSubjects: CourseInfo[] = [
    {
        name: 'Mathematics',
        classId: 'X-01',
        courseId: 'MATH-2301',
        description:
            'This course covers a comprehensive range of mathematical disciplines including algebraic manipulation, geometric reasoning, trigonometric functions, and an introduction to calculus. Students will apply these concepts to real-life problem solving, data analysis, and modeling scenarios. Emphasis is placed on logical reasoning, structured thinking, and the practical application of mathematical methods in science and economics.',
    },
    {
        name: 'Physics',
        classId: 'X-02',
        courseId: 'PHYS-2302',
        description:
            'Physics explores the fundamental principles that govern the natural world, including motion, energy, forces, and waves. Through theoretical discussions and hands-on experiments, students will develop a deeper understanding of Newtonian mechanics, thermodynamics, electromagnetism, and basic quantum concepts. The course encourages critical thinking and scientific inquiry through observation, hypothesis testing, and real-world application.',
    },
    {
        name: 'Chemistry',
        classId: 'X-03',
        courseId: 'CHEM-2303',
        description:
            'This subject introduces students to the structure of matter, the periodic table, chemical bonding, and the laws governing chemical reactions. Through laboratory experiments and conceptual learning, students will explore solutions, acids and bases, stoichiometry, and thermochemistry. The course emphasizes analytical thinking and scientific methodology to investigate the chemical behavior of substances in everyday life.',
    },
    {
        name: 'Biology',
        classId: 'X-04',
        courseId: 'BIOL-2304',
        description:
            'Biology investigates the structure, function, growth, and evolution of living organisms. Key topics include cellular biology, genetics, ecosystems, biodiversity, and human physiology. Students will engage in scientific investigations and lab-based activities to observe and analyze biological systems. The course nurtures an appreciation for life sciences and the complex interactions that sustain ecosystems.',
    },
    {
        name: 'History',
        classId: 'X-05',
        courseId: 'HIST-2305',
        description:
            'This course provides a critical overview of world history from ancient civilizations to modern times. Students will analyze social, political, economic, and cultural developments across different regions and eras. Emphasis is placed on historical inquiry, primary source evaluation, and understanding cause-and-effect relationships that shape human events. The course fosters global awareness and critical citizenship.',
    },
    {
        name: 'English Literature',
        classId: 'X-06',
        courseId: 'ENG-2306',
        description:
            'English Literature invites students to engage deeply with poetry, drama, fiction, and non-fiction from various periods and cultural contexts. Through reading, analysis, and creative expression, students will examine literary devices, author intent, and thematic depth. The course encourages analytical thinking, empathy, and a refined appreciation for language, storytelling, and human experience.',
    },
];

export function CourseAreaInteractive() {
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const direction = e.deltaY > 0 ? 'down' : 'up';
        console.log('Scroll direction:', direction);
    };

    const localCourses: AllCourses = [
        {
            lessons: Array.from({ length: 10 }, () => ({
                ticks: [true, true, false, false, false], // 2/5
            })),
        },
        {
            lessons: Array.from({ length: 10 }, () => ({
                ticks: [true, false, false, false, true], // 2/5
            })),
        },
        {
            lessons: Array.from({ length: 10 }, () => ({
                ticks: [false, false, true, false, false], // 3/5
            })),
        },
        {
            lessons: Array.from({ length: 10 }, () => ({
                ticks: [true, true, true, true, false], // 4/5
            })),
        },
        {
            lessons: Array.from({ length: 10 }, () => ({
                ticks: [true, true, true, true, true], // 5/5
            })),
        },
        {
            lessons: Array.from({ length: 10 }, () => ({
                ticks: [false, false, false, false, false], // 0/5
            })),
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 xl:grid-cols-3">
            {localCourses.map((course, index) => {
                const courseSingle: AllCourses = [course];
                const progress = calculateProgress(courseSingle);
                const info = highSchoolSubjects[index];

                return (
                    <button
                        key={index}
                        onClick={() => console.log(`Clicked ${info.name}`)}
                        className="h-[65vh] overflow-y-auto rounded-lg border bg-muted/20 p-2 text-left transition hover:shadow-lg"
                    >
                        <div className="flex flex-col gap-1 py-2 text-center">
                            <span className="text-md font-semibold tabular-nums @[250px]/card:text-2xl">{info.name}</span>
                            <span className="text-xs text-muted-foreground">Course ID: {info.courseId}</span>
                            <span className="text-xs text-muted-foreground">Class ID: {info.classId}</span>
                        </div>

                        <div className="h-[50vh] pt-1">
                            <div className="flex h-full flex-col justify-between p-1">
                                <Card className="h-[45vh]">
                                    <CardContent className="ml-2 flex flex-col items-start justify-start gap-2 p-6 text-sm text-muted-foreground">
                                        {info.description}
                                    </CardContent>
                                </Card>
                                <hr className="my-3 mb-1 border-t border-muted" />
                                <div className="flex flex-col justify-center pt-2">
                                    <span className="mb-1 text-center text-xs font-medium text-muted-foreground">Progress: {progress}%</span>
                                    <Progress value={progress} />
                                </div>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

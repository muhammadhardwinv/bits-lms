export type ForumContentType = {
    forumTitle: string;
    learningOutcome: string;
    description: string;
    subTopics: string[];
    lecturerName: string;
    lecturerId: string;
    courseName: string;
    courseId: string;
    classId: string;
    link: string;
    start: string;
    end: string;
};

export const forumContents: ForumContentType[] = [
    {
        forumTitle: 'Environmental Impact of Chemical',
        description: 'Discuss the ecological impact of chemicals and mitigation strategies.', // optional
        learningOutcome: 'Analyze the ecological consequences of improper Chemical disposal...',
        subTopics: ['Terrestrial pollution', 'Aquatic ecosystem effects', 'Chemical spill case studies', 'Global regulatory comparisons'],
        lecturerName: 'Dr. Sinta Dewi',
        lecturerId: 'LECT-SCI-01',
        courseName: 'Science',
        courseId: 'SCI-4321',
        classId: 'CLS-SCI-01',
        link: '/assignment/science/SCI-4321',
        start: '14/07/2025, 15:00 GMT+7',
        end: '21/07/2025, 23:59 GMT+7',
    },
];

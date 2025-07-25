export type People = {
    id: string;
    name: string;
    email: string;
    courseId: string;
    classId: string;
};

const peopleList: People[] = [];
const courses = [
    { courseId: 'MAT-1010', classId: 'CLS-101', courseName: 'Mathematics' },
    { courseId: 'SCI-4321', classId: 'CLS-102', courseName: 'Science' },
    { courseId: 'BIO-2201', classId: 'CLS-103', courseName: 'Biology' },
    { courseId: 'PHY-2502', classId: 'CLS-104', courseName: 'Physics' },
    { courseId: 'CHEM-1103', classId: 'CLS-105', courseName: 'Chemistry' },
    { courseId: 'GEO-3010', classId: 'CLS-106', courseName: 'Geography' },
];

function generatePeopleName(index: number) {
    const firstNames = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Farhan', 'Gita', 'Hana', 'Iqbal', 'Joko'];
    const lastNames = ['Saputra', 'Sari', 'Wijaya', 'Pratama', 'Lestari', 'Putri', 'Santoso', 'Yuliana', 'Nugroho', 'Rahmawati'];
    return `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`;
}


courses.forEach((course) => {
    for (let i = 1; i <= 20; i++) {
        const id = `${course.courseId}-STU-${i.toString().padStart(2, '0')}`;
        const name = generatePeopleName(i);
        const email = `${name.toLowerCase().replace(' ', '.')}@institution.edu`;

        peopleList.push({
            id,
            name,
            email,
            courseId: course.courseId,
            classId: course.classId,
        });
    }
});

export const peopleData = peopleList;

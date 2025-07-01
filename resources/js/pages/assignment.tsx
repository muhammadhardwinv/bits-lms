import AssignmentContent from '@/components/assignment-content';
import { UserModel } from '@/lib/types';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

export default function Assignment() {
    const [user, setUser] = useState<UserModel>({
        name: 'Chris',
        role: 'student',
    });

    const assignments = [
        {
            title: 'Algebraic Functions in Real Life',
            courseName: 'Mathematics',
            courseId: 'MATH-2301',
            classId: 'X-01',
            dueDate: '2025-07-10',
            type: 'Written Report',
            description: 'Explore financial planning with quadratic functions.',
            link: '/assignment/mathematics/MATH-2301',
        },
        {
            title: 'Newton’s Laws in Daily Motion',
            courseName: 'Physics',
            courseId: 'PHYS-1102',
            classId: 'X-02',
            dueDate: '2025-07-12',
            type: 'Video Project',
            description: 'Demonstrate Newton’s 3 Laws with a home experiment.',
            link: '/assignment/physics/PHYS-1102',
        },
        {
            title: 'Kitchen Chemistry',
            courseName: 'Chemistry',
            courseId: 'CHEM-1010',
            classId: 'X-03',
            dueDate: '2025-07-14',
            type: 'Research Paper',
            description: 'Analyze kitchen chemical reactions.',
            link: '/assignment/chemistry/CHEM-1010',
        },
        {
            title: 'Ancient Empires Compared',
            courseName: 'History',
            courseId: 'HIST-3300',
            classId: 'X-05',
            dueDate: '2025-07-09',
            type: 'Essay + Poster',
            description: 'Compare Roman and Han empires.',
            link: '/assignment/history/HIST-3300',
        },
        {
            title: 'Conflict & Resolution in Lit',
            courseName: 'English Literature',
            courseId: 'ENG-1201',
            classId: 'X-06',
            dueDate: '2025-07-11',
            type: 'Essay',
            description: 'Compare Shakespeare and modern novels.',
            link: '/assignment/english-literature/ENG-1201',
        },
        {
            title: 'Symbolism in Tang Poetry',
            courseName: 'Mandarin Literature',
            courseId: 'MAND-1101',
            classId: 'M-06',
            dueDate: '2025-07-13',
            type: 'Translation + Analysis',
            description: 'Analyze metaphors in classical poetry.',
            link: '/assignment/mandarin-literature/MAND-1101',
        },
    ];

    return (
        <>
            <Head title="Dashboard">
                <Link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <AssignmentContent title="Your Assignment" items={assignments} icon={ClipboardList} user={user} link={(assignment) => assignment.link} />
        </>
    );
}

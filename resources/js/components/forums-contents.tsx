import { Link } from '@inertiajs/react';

const courseDetails = [
    {
        name: 'Mathematics',
        classId: 'X-01',
        courseId: 'MATH-2301',
        description: 'Master algebra, geometry, and calculus concepts with real-life problem solving.',
    },
    {
        name: 'Physics',
        classId: 'X-02',
        courseId: 'PHYS-2302',
        description: 'Explore motion, energy, and quantum principles through hands-on science.',
    },
    {
        name: 'Chemistry',
        classId: 'X-03',
        courseId: 'CHEM-2303',
        description: 'Dive into the world of atoms, molecules, and reactions in everyday life.',
    },
    {
        name: 'History',
        classId: 'X-05',
        courseId: 'HIST-2305',
        description: 'Trace human progress from ancient civilizations to modern societies.',
    },
    {
        name: 'English Literature',
        classId: 'X-06',
        courseId: 'ENG-2306',
        description: 'Analyze storytelling and literary themes from Shakespeare to contemporary authors.',
    },
    {
        name: 'Mandarin Literature',
        classId: 'M-06',
        courseId: 'CHN-2306',
        description: 'Appreciate Chinese prose and poetry while exploring culture and heritage.',
    },
];

export default function ForumsContent() {
    return (
        <div className="space-y-8 p-6">
            <div className="w-full space-y-1">
                <h1 className="text-4xl font-bold">Forums</h1>
                <p className="text-xl text-gray-600">LK001-LEC</p>
                <p className="mt-8 ml-16 text-lg font-semibold">Prof. Bastian Schweinsteiger</p>
                <p className="text-md ml-16 text-gray-500">CDM0031</p>
            </div>

            {/* Separator Line */}
            <div className="border-t py-2" />

            {/* Grid Section */}
            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="grid grid-cols-6 gap-8">
                    {courseDetails.map((info) => {
                        if (!info) return null;

                        const slug = info.name.toLowerCase().replace(/\s+/g, '-');

                        return (
                            <Link
                                key={info.courseId}
                                href={`/courses/${slug}`}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md"
                            >
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold text-indigo-700 group-hover:underline">{info.name}</h2>
                                    <p className="text-xs text-gray-500">Course ID: {info.courseId}</p>
                                    <p className="text-xs text-gray-500">Class ID: {info.classId}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

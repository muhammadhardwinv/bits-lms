import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ContentLayout from '@/layouts/content-layout';
import { Assignment, UserModel } from '@/lib/types';
import { ClipboardList } from 'lucide-react';

const courseDetails = [
    {
        name: 'Mathematics',
        classId: 'X-01',
        courseId: 'MATH2301',
        description: 'Master algebra, geometry, and calculus concepts with real-life problem solving.',
    },
    {
        name: 'Physics',
        classId: 'X-02',
        courseId: 'PHYS2302',
        description: 'Explore motion, energy, and quantum principles through hands-on science.',
    },
    {
        name: 'Chemistry',
        classId: 'X-03',
        courseId: 'CHEM2303',
        description: 'Dive into the world of atoms, molecules, and reactions in everyday life.',
    },
    {
        name: 'History',
        classId: 'X-05',
        courseId: 'HIST2305',
        description: 'Trace human progress from ancient civilizations to modern societies.',
    },
    {
        name: 'English Literature',
        classId: 'X-06',
        courseId: 'ENG2306',
        description: 'Analyze storytelling and literary themes from Shakespeare to contemporary authors.',
    },
    {
        name: 'Mandarin Literature',
        classId: 'M-06',
        courseId: 'CHN2306',
        description: 'Appreciate Chinese prose and poetry while exploring culture and heritage.',
    },
];

export default function AssignmentContent({
    title,
    items,
    user,
    icon,
    link,
}: {
    title: string;
    items: Assignment[];
    user: UserModel;
    icon: React.ElementType;
    link: (assignment: Assignment) => string;
}) {
    return (
        <ContentLayout>
            <div className="w-full space-y-8 p-6">
                <div className="col-span-6">
                    <div className="h-[90vh] w-full overflow-y-auto rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
                        <div className="display:block mb-6 ml-4 flex items-center justify-between border-b pb-4 dark:border-gray-600">
                            <div className="flex w-[78vw] items-center gap-3">
                                <ClipboardList className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Explore open discussions, shared materials, and student interactions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    No threads available. Be the first to start a discussion for this class.
                                </div>
                            ) : (
                                items.map((assignment, index) => {
                                    const course = courseDetails.find((c) => c.courseId === assignment.courseId);

                                    return (
                                        <a href={link(assignment)} key={index} target="_blank" rel="noopener noreferrer" className="block">
                                            <Card
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => console.log('Card clicked')}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        console.log('Card activated by keyboard');
                                                    }
                                                }}
                                                className="cursor-pointer transition-shadow duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
                                            >
                                                <CardContent className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {assignment.type}
                                                        </Badge>
                                                    </div>

                                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                                        <span className="font-medium text-indigo-700 dark:text-indigo-400">{course?.name}</span> (
                                                        {assignment.courseId}) — Class {assignment.classId}
                                                    </p>

                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {assignment.description || 'No description provided for this thread.'}
                                                    </p>

                                                    <p className="text-xs text-gray-400 dark:text-gray-500">📅 Due: {assignment.dueDate}</p>
                                                </CardContent>
                                            </Card>
                                        </a>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
}

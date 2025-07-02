import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Assignment, UserModel } from '@/lib/types';
import { courses, CourseType } from '@/lib/coursesDetails';
import { ClipboardList } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function AssignmentContent({
    title,
    items,
    link,
}: {
    title: string;
    items: Assignment[];
    user: UserModel;
    icon: React.ElementType;
    link: (assignment: Assignment) => string;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-[90vh] overflow-y-auto rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
                    <div className="mb-6 ml-4 flex items-center justify-between border-b pb-4 dark:border-gray-600">
                        <div className="flex w-full items-center gap-3">
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
                                const course = courses.find((c: CourseType) => c.courseId === assignment.courseId);

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
                                                    <span className="font-medium text-indigo-700 dark:text-indigo-400">{course?.courseName}</span> (
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
    );
}

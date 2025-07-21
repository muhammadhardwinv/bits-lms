import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { courses, CourseType } from '@/lib/coursesDetails';
import { useUserStore } from '@/lib/store/userStore';
import { Assignment, UserModel } from '@/lib/types';
import { Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

export default function AssignmentContent({
    title,
    items,
    icon,
    link,
    courseId,
    user,
}: {
    title: string;
    items: Assignment[];
    icon: React.ElementType;
    link: (assignment: Assignment) => string;
    courseId: string;
    user: UserModel;
}) {
    const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
        title: '',
        type: 'Essay',
        dueDate: '',
        classId: '',
    });

    const courseIdFromItems = items.length > 0 ? items[0].courseId : courseId;

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-[90vh] overflow-y-auto rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
                    <div className="mb-6 ml-4 flex items-center justify-between border-b pb-4 dark:border-gray-600">
                        <div className="flex w-full items-center justify-between gap-3">
                            <div className="flex flex-row items-center">
                                <ClipboardList className="mx-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                            </div>

                            {user.role === 'teacher' && courseIdFromItems && (
                                <Link
                                    href={route('assignment.new', courseIdFromItems)}
                                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <ClipboardList className="h-4 w-4" />
                                    New Assignment
                                </Link>
                            )}
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
                                    <a
                                        href={`/assignment/${assignment.courseId}`}
                                        key={index}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
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

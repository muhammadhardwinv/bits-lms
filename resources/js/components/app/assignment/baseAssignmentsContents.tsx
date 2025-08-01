import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AssignmentsModel, CourseModel, UserModel } from '@/lib/types';
import { Link } from '@inertiajs/react';
import { ClipboardList, LucideIcon } from 'lucide-react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    allCourse: CourseModel[];
    assignments: AssignmentsModel[];
}

interface AssignmentsContentProps {
    title: string;
    items: AssignmentsModel[];
    icon: LucideIcon;
    link: (a: AssignmentsModel) => string;
    allCourse: CourseModel[];
    user: UserModel;
}

export default function AssignmentsContent({ title, items, icon, link, allCourse, user }: AssignmentsContentProps) {
    const courseIdFromItems = items.length > 0 ? items[0].courseId : (allCourse[0]?.id ?? '');

    return (
        <div className="flex w-full flex-row">
            <div className="flex min-h-screen w-full justify-center">
                <div className="h-[90vh] w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex w-full items-center justify-between gap-3">
                            <div className="flex flex-row items-center">
                                <ClipboardList className="mx-2 h-5 w-5 text-[#F2951B] dark:text-[#F2951B]" />
                                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                            </div>

                            {user.role === 'admin' && courseIdFromItems && (
                                <Link
                                    href={route('assignment.new', courseIdFromItems)}
                                    className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 from-[#F2951B] to-[#FFD599] px-4 py-2 text-sm font-medium shadow hover:opacity-90 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-gradient-to-r dark:text-white"
                                >
                                    <ClipboardList className="mx-1 h-5 w-5 text-[#F2951B] dark:text-white" />
                                    New Assignment
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {items.length === 0 ? (
                            <div className="flex h-[72vh] flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                                No threads available. Be the first to start a discussion for this class.
                            </div>
                        ) : (
                            items.map((assignment, index) => {
                                const course = allCourse.find((c) => c.id === assignment.courseId);

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
                                                    <span className="bg-gradient-to-r from-[#F2951B] to-[#FFD599] bg-clip-text font-medium text-transparent">
                                                        Session ID: {assignment.session_id}
                                                    </span>
                                                </p>

                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {assignment.description || 'No description provided for this thread.'}
                                                </p>

                                                <p className="text-xs text-gray-400 dark:text-gray-500">📅 Due: {assignment.due_date}</p>
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

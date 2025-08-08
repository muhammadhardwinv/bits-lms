import { ContentLayout } from '@/layouts/content-layout';
import { ClassroomType, UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    classroom: ClassroomType;
    classroomId?: string;
    [key: string]: any;
}

const SelectedClassroom = () => {
    const { classroom, classroomId, auth } = usePage<PageProps>().props;

    if (!classroom) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-red-600">Classroom not found.</h1>
            </div>
        );
    }

    // Dummy data tugas
    const assignments = [
        { title: 'Task #1: Introduction to React', completed: true },
        { title: 'Task #2: Inertia.js Basics', completed: false },
        { title: 'Task #3: API Integration', completed: false },
        { title: 'Task #4: UI Enhancements', completed: true },
    ];

    const completedCount = assignments.filter((a) => a.completed).length;
    const totalCount = assignments.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    return (
        <>
            <Head title={`Classroom: ${classroom.name}`} />
            <ContentLayout user={auth.user}>
                <div className="space-y-8 p-6">
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">📚 {classroom.name}</h1>
                        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700">ID: {classroomId ?? classroom.id}</span>
                    </div>

                    {/* DETAIL */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg border bg-white p-4 shadow">
                            <p className="text-gray-500">Course ID</p>
                            <p className="text-lg font-medium text-gray-900">{classroom.course_id}</p>
                        </div>

                        <div className="rounded-lg border bg-white p-4 shadow">
                            <p className="text-gray-500">Teacher ID</p>
                            <p className="text-lg font-medium text-gray-900">{classroom.teacher_id}</p>
                        </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">Task Progress</p>
                        <div className="h-4 w-full overflow-hidden rounded bg-gray-200">
                            <div className="h-full bg-green-500 transition-all" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-600">
                            {completedCount} out of {totalCount} completed task. ({progressPercent}%)
                        </p>
                    </div>

                    {/* ASSIGNMENTS */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Task Lists</h2>
                        <ul className="space-y-2">
                            {assignments.map((assignment, i) => (
                                <li
                                    key={i}
                                    className={`flex items-center justify-between rounded border px-4 py-2 shadow-sm ${
                                        assignment.completed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                                    }`}
                                >
                                    <span>{assignment.title}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            assignment.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                        }`}
                                    >
                                        {assignment.completed ? 'Completed' : 'Not Complete'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </ContentLayout>
        </>
    );
};

export default SelectedClassroom;

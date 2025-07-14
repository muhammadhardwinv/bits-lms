import { cls, courses } from '@/lib/coursesDetails';
import { useUserStore } from '@/lib/store/userStore';
import { Assignment } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export type classOptions = (typeof cls)[number];

export default function AssignmentFormContent() {
    const { courseId } = usePage().props as Partial<{ courseId: string }>;
    const { role } = useUserStore();

    const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
        title: '',
        type: 'Essay',
        dueDate: '',
        courseId: courseId ?? '',
        classId: '',
    });

    const handleChange = (field: keyof Assignment, value: string) => {
        setNewAssignment((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Submitting:', newAssignment);
    };

    return (
        <div className="mx-auto max-w-xl rounded bg-white p-6 shadow dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">Create New Assignment</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course</label>
                    <select
                        value={newAssignment.courseId}
                        onChange={(e) => handleChange('courseId', e.target.value)}
                        className="w-full rounded border-gray-300 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
                    <select
                        value={newAssignment.classId}
                        onChange={(e) => handleChange('classId', e.target.value)}
                        className="w-full rounded border-gray-300 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Class</option>
                        {cls.map((item) => (
                            <option key={item} value={item}>
                                Class {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input
                        type="text"
                        value={newAssignment.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full rounded border-gray-300 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter assignment title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                    <input
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                        className="w-full rounded border-gray-300 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <button onClick={handleSubmit} className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700">
                    Submit
                </button>
            </div>
        </div>
    );
}

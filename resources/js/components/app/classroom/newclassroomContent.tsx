import React from 'react';

type Props = {
    role: string;
    data: {
        name: string;
        course_id: string;
        teacher_id: string;
    };
    setData: (field: string, value: any) => void;
    errors: Record<string, string>;
    processing: boolean;
    submit: (e: React.FormEvent) => void;
};

export default function NewClassroomContent({ role, data, setData, errors, processing, submit }: Props) {
    return (
        <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
            <form onSubmit={submit} className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-md">
                <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">New Classroom</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Class Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="e.g., LC001"
                        className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                    />
                    {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Course ID</label>
                    <input
                        type="text"
                        value={data.course_id}
                        onChange={(e) => setData('course_id', e.target.value)}
                        placeholder="e.g., CS001"
                        className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                    />
                    {errors.course_id && <div className="text-sm text-red-500">{errors.course_id}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Teacher ID</label>
                    <input
                        type="text"
                        value={data.teacher_id}
                        onChange={(e) => setData('teacher_id', e.target.value)}
                        placeholder="e.g., LKC001"
                        className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                    />
                    {errors.teacher_id && <div className="text-sm text-red-500">{errors.teacher_id}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full rounded-md border bg-gray-200 py-2 text-black transition-colors duration-200 ${
                        processing ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-[#F2951B]'
                    }`}
                >
                    {processing ? 'Creating...' : 'Create Classroom'}
                </button>
            </form>
        </div>
    );
}

import { UserModel } from '@/lib/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

interface PageProps {
    auth: {
        user: UserModel;
    };
}

export default function NewAssignment() {
    const { auth } = usePage<{ auth: { user: UserModel } }>().props;
    const { data, setData, errors } = useForm({
        session_id: '',
        course_id: '',
        title: '',
        description: '',
        due_date: '',
        attempt_limit: '',
        type: '',
        max_points: '',
        instructions: '',
        attachment_file: null as File | null, // FIXED type mismatch
        attachment_url: '',
        created_at: '',
        updated_at: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<'success' | 'fail' | null>(null);

    function handleCreateAssignment() {
        const payload = {
            session_id: data.session_id,
            course_id: data.course_id,
            title: data.title,
            description: data.description,
            due_date: data.due_date,
            attempt_limit: data.attempt_limit,
            type: data.type,
            max_points: data.max_points,
            instructions: data.instructions,
            attachment_file: data.attachment_file,
            // 👇 ensure payload always has this field (prevents TS errors & keeps backend clean)
            attachment_url: data.attachment_file ? '' : data.attachment_url,
            created_at: data.created_at,
            updated_at: data.updated_at,
        };

        router.post(route('assignments.store'), payload, {
            forceFormData: true, // ✅ REQUIRED when sending File in Inertia
            onError: () => {
                toast.error('Failed to create assignment. Invalid data input');
                setIsLoading(false);
            },
            onSuccess: () => {
                toast.success('Assignment created successfully!');
                setData({
                    session_id: '',
                    course_id: '',
                    title: '',
                    description: '',
                    due_date: '',
                    attempt_limit: '',
                    type: '',
                    max_points: '',
                    instructions: '',
                    attachment_file: null,
                    attachment_url: '',
                    created_at: '',
                    updated_at: '',
                });
                setIsLoading(false);
            },
        });
    }

    return (
        <>
            <Head title="Input New Assignment" />
            <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4 py-4 dark:bg-[#1c1c1c]">
                <Toaster richColors position="top-center" />
                <div className="w-full max-w-4xl space-y-6 rounded-2xl border border-gray-300 p-8 shadow-md dark:bg-[#1c1c1c]">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">New Assignments</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateAssignment();
                            console.log('Creating new Assignment');
                        }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-8">
                            {/* Session ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Session ID</label>
                                <input
                                    type="text"
                                    value={data.session_id}
                                    onChange={(e) => setData('session_id', e.target.value)}
                                    placeholder="Input Session ID"
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.session_id && <div className="text-sm text-red-500">{errors.session_id}</div>}
                            </div>

                            {/* Course ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Course ID</label>
                                <input
                                    type="text"
                                    value={data.course_id}
                                    onChange={(e) => setData('course_id', e.target.value)}
                                    placeholder="Input Course ID"
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.course_id && <div className="text-sm text-red-500">{errors.course_id}</div>}
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-8">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Assignment Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Input Assignment Title"
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.due_date && <div className="text-sm text-red-500">{errors.due_date}</div>}
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-8">
                            {/* Attempt Limit */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Attempt Limit</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={3}
                                    value={data.attempt_limit}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        const clamped = Math.min(3, Math.max(1, value));
                                        setData('attempt_limit', String(clamped));
                                    }}
                                    placeholder="Enter attempt limit (1–3)"
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.attempt_limit && <div className="text-sm text-red-500">{errors.attempt_limit}</div>}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Assignment Type</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                >
                                    <option value="">Select assignment type</option>
                                    <option value="Essay">Essay</option>
                                    <option value="Quiz">Quiz</option>
                                    <option value="Project">Project</option>
                                    <option value="Exam">Exam</option>
                                    <option value="Presentation">Presentation</option>
                                    <option value="Lab Report">Lab Report</option>
                                </select>
                                {errors.type && <div className="text-sm text-red-500">{errors.type}</div>}
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-8">
                            {/* Max Points */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Max Points</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={data.max_points}
                                    onChange={(e) => setData('max_points', e.target.value)}
                                    placeholder="Enter max points"
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.max_points && <div className="text-sm text-red-500">{errors.max_points}</div>}
                            </div>

                            {/* Attachment URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Attachment</label>

                                {/* File input */}
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('attachment_file', e.target.files[0]); // store File object in state
                                        }
                                    }}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-[#2a2a2a] dark:file:text-gray-300"
                                />

                                {/* Optional: keep URL as fallback */}
                                <input
                                    type="url"
                                    value={data.attachment_url}
                                    onChange={(e) => setData('attachment_url', e.target.value)}
                                    placeholder="https://example.com/file.pdf"
                                    className="mt-2 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                    pattern="https?://.*"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            {/* Description */}
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter description"
                                className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                rows={3}
                            />
                            {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                        </div>

                        <div className="mt-6">
                            {/* Instructions */}
                            <label className="block text-sm font-medium text-gray-700">Instructions</label>
                            <textarea
                                value={data.instructions}
                                onChange={(e) => setData('instructions', e.target.value)}
                                placeholder="Enter instructions"
                                className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                rows={3}
                            />
                            {errors.instructions && <div className="text-sm text-red-500">{errors.instructions}</div>}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-8">
                            {/* Created At */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Created At</label>
                                <input
                                    type="datetime-local"
                                    value={data.created_at}
                                    onChange={(e) => setData('created_at', e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.created_at && <div className="text-sm text-red-500">{errors.created_at}</div>}
                            </div>

                            {/* Updated At */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Updated At</label>
                                <input
                                    type="datetime-local"
                                    value={data.updated_at}
                                    onChange={(e) => setData('updated_at', e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                                />
                                {errors.updated_at && <div className="text-sm text-red-500">{errors.updated_at}</div>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-md border bg-gray-200 py-2 text-black transition-colors duration-200 ${
                                isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-[#F2951B]'
                            }`}
                        >
                            {isLoading ? 'Creating...' : 'Create Assignment'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

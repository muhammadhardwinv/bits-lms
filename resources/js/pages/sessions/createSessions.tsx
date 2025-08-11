import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function CreateSessions({ courseId, classroomId, teacher_id }: { courseId: string; classroomId: string; teacher_id: string }) {
    const { auth } = usePage<{ auth: { user: UserModel } }>().props;

    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, errors, processing } = useForm({
        title: '',
        description: '',
        schedule_date: '',
        course_id: courseId ?? '',
        teacher_id: teacher_id ?? '',
    });

    useEffect(() => {
        if (courseId) {
            setData('course_id', courseId);
        }
    }, [courseId]);

    const handleCreateSession = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const toastId = toast.loading('Adding session to database...');
        setIsLoading(true);

        console.log('classroomId:', classroomId);

        route('sessions.create.classroom', { id: classroomId }),
            data,
            {
                onSuccess: () => {
                    toast.success('Session created successfully!', { id: toastId });
                    setData({
                        title: '',
                        description: '',
                        schedule_date: '',
                        course_id: courseId ?? '',
                        teacher_id: teacher_id ?? '',
                    });
                    setTimeout(() => {
                        router.visit(`/sessions/${courseId}`);
                    }, 1500);
                },
                onError: () => {
                    toast.error('Failed to create session. Please check the form.', { id: toastId });
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            };
    };

    return (
        <ContentLayout user={auth.user}>
            <Head title="Create New Session" />
            <Toaster richColors position="top-center" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-lg rounded-2xl border border-gray-300 bg-white p-8 shadow-md">
                    <h2 className="mb-6 text-center text-2xl font-bold text-black dark:text-[#F2951B]">Create New Session</h2>
                    <form onSubmit={handleCreateSession} className="space-y-6">
                        <input type="hidden" name="course_id" value={data.course_id} readOnly />

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                                placeholder="Session title"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                                placeholder="Session description"
                                rows={4}
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Teacher Id
                            </label>
                            <input
                                id="teacher_id"
                                value={data.teacher_id}
                                onChange={(e) => setData('teacher_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                                placeholder="Teacher Id"
                            />
                            {errors.teacher_id && <p className="mt-1 text-sm text-red-500">{errors.teacher_id}</p>}
                        </div>

                        <div>
                            <label htmlFor="schedule_date" className="block text-sm font-medium text-gray-700">
                                Schedule Date
                            </label>
                            <input
                                id="schedule_date"
                                type="date"
                                value={data.schedule_date}
                                onChange={(e) => setData('schedule_date', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                            {errors.schedule_date && <p className="mt-1 text-sm text-red-500">{errors.schedule_date}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing || isLoading}
                            className={`w-full rounded-md border bg-gray-200 py-2 text-black hover:bg-[#F2951B] ${
                                processing || isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer'
                            }`}
                        >
                            {processing || isLoading ? 'Creating...' : 'Create Session'}
                        </button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    );
}

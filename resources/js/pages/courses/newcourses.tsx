import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

interface PageProps {
    auth: {
        user: UserModel;
    };
}

export default function NewCourses() {
    const { auth } = usePage<{ auth: { user: UserModel } }>().props;
    const { data, setData, errors } = useForm({
        name: '',
        description: '',
        teacher_id: auth.user.id,
        // teacherId: '',
        // file: null as File | null,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<'success' | 'fail' | null>(null);

    function handleCreateCourse() {
        const payload = {
            name: data.name,
            description: data.description,
            teacher_id: data.teacher_id,
        };
        const toastStatus = toast.loading('Adding course to database. Please wait!');
        setIsLoading(true);

        router.post(route('courses.store'), payload, {
            onError: () => {
                toast.error('Failed to create course. Invalid data input');
                toast.dismiss(toastStatus);
            },
            onSuccess: () => {
                setTimeout(() => {
                    toast.dismiss(toastStatus);
                    toast.success('Course added successfully! Redirecting back to Course Page.');
                    setData({
                        name: '',
                        description: '',
                        teacher_id: auth.user.id, // ✅ reset with current user ID
                    });
                    setIsLoading(false);
                    setTimeout(() => {
                        router.visit('/courses');
                    }, 2000);
                }, 1500); // ⏱ Shortened delay
            },
        });
    }

    return (
        <ContentLayout user={auth.user}>
            <Head title="Input New Course" />
            <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
                <Toaster richColors position="top-center" />
                <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-8 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">New Course</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateCourse();
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g., Software Engineering"
                                className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                            />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Brief course summary..."
                                className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-[#1c1c1c]"
                            />
                            {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-md border bg-gray-200 py-2 text-black transition-colors duration-200 ${
                                isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-[#F2951B]'
                            }`}
                        >
                            {isLoading ? 'Creating...' : 'Create Course'}
                        </button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    );
}

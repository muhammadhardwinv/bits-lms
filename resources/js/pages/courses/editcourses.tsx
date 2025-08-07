import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

type Course = {
    id: number;
    name: string;
    description: string | null;
};

export default function EditCourse() {
    const { props } = usePage<{ course: Course }>();
    const course = props.course;
    const { auth } = usePage<{ auth: { user: UserModel } }>().props;

    const { data, setData, errors } = useForm({
        name: course.name,
        description: course.description ?? '',
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleUpdateCourse() {
        const payload = {
            name: data.name,
            description: data.description,
        };

        const toastStatus = toast.loading('Updating course. Please wait!');
        setIsLoading(true);

        router.put(`/admin/courses/${course.id}`, payload, {
            onError: () => {
                toast.dismiss(toastStatus);
                toast.error('Failed to update course. Check your input.');
                setIsLoading(false);
            },
            onSuccess: () => {
                setTimeout(() => {
                    toast.dismiss(toastStatus);
                    toast.success('Course updated successfully! Redirecting back to Course Page');
                    setIsLoading(false);

                    setTimeout(() => {
                        router.visit('/courses');
                    }, 2000);
                }, 5000);
            },
        });
    }

    return (
        <ContentLayout user={auth.user}>
            <Head title="Edit Course" />
            <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
                <Toaster richColors position="top-center" />
                <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-6 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">Edit Course</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateCourse();
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                                rows={5}
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
                            {isLoading ? 'Updating...' : 'Update Course'}
                        </button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    );
}

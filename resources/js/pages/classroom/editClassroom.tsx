import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

type Classroom = {
    id: string;
    name: string;
    course_id: string;
    teacher_id: string;
};

export default function EditClassroom() {
    const { props } = usePage<{ classroom: Classroom }>();
    const classroom = props.classroom;
    const { auth } = usePage<{ auth: { user: UserModel } }>().props;

    // const { data, setData, errors } = useForm({
    //     name: classroom.name,
    //     course_id: classroom.course_id,
    //     teacher_id: classroom.teacher_id,
    // });

    const { data, setData, errors, put, processing } = useForm({
        name: classroom.name,
        course_id: classroom.course_id,
        teacher_id: classroom.teacher_id,
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleUpdateClassroom() {
        const payload = {
            name: data.name,
            course_id: data.course_id,
            teacher_id: data.teacher_id,
        };

        const toastStatus = toast.loading('Updating classroom. Please wait!');
        setIsLoading(true);

        router.put(`/admin/classrooms/${classroom.id}`, payload, {
            onError: (errs: any) => {
                // Log backend validation errors
                console.log('Validation Errors:', errs);

                // Keep current toast/loading behavior
                toast.dismiss(toastStatus);
                toast.error('Failed to update classroom. Check your input.');
                setIsLoading(false);
            },
            onSuccess: () => {
                setTimeout(() => {
                    toast.dismiss(toastStatus);
                    toast.success('Classroom updated successfully! Redirecting back.');
                    setIsLoading(false);

                    setTimeout(() => {
                        router.visit('/admin/classrooms');
                    }, 2000);
                }, 2000);
            },
        });
    }


    return (
        <ContentLayout user={auth.user}>
            <Head title="Edit Classroom" />
            <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
                <Toaster richColors position="top-center" />
                <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-6 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">Edit Classroom</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateClassroom();
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
                            <label className="block text-sm font-medium text-gray-700">Course ID</label>
                            <input
                                type="text"
                                value={data.course_id}
                                onChange={(e) => setData('course_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                            {errors.course_id && <div className="text-sm text-red-500">{errors.course_id}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teacher ID</label>
                            <input
                                type="text"
                                value={data.teacher_id}
                                onChange={(e) => setData('teacher_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                            {errors.teacher_id && <div className="text-sm text-red-500">{errors.teacher_id}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-md border bg-gray-200 py-2 text-black transition-colors duration-200 ${
                                isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-[#F2951B]'
                            }`}
                        >
                            {isLoading ? 'Updating...' : 'Update Classroom'}
                        </button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    );
}

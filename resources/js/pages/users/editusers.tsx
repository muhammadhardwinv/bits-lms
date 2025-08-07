import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

interface PageProps {
    auth: {
        user: UserModel;
    };
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    [key: string]: unknown;
}

export default function EditUsers() {
    const { auth, user } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleUpdateUser() {
        const payload = {
            name: data.name,
            email: data.email,
            role: data.role,
        };

        const toastStatus = toast.loading('Updating user. Please wait!');
        setIsLoading(true);

        router.put(`/admin/users/${user.id}`, payload, {
            onError: () => {
                toast.error('Failed to update user data. Check your Input');
                setIsLoading(false);
            },
            onSuccess: () => {
                setTimeout(() => {
                    toast.dismiss(toastStatus);
                    toast.success('User updated successfully. Redirecting back to User Page');
                    setIsLoading(false);

                    setTimeout(() => {
                        router.visit('/admin/users');
                    }, 2000);
                }, 5000);
            },
        });
    }

    return (
        <ContentLayout user={auth.user}>
            <Head title="Edit User" />
            <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
                <Toaster richColors position="top-center" />
                <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-6 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">Edit User</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateUser();
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                placeholder="Fullname"
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="yourname@institution.edu"
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                                placeholder="Leave blank to keep current password"
                            />
                            {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || processing}
                            className={`w-full rounded-md border bg-gray-200 py-2 text-black transition-colors duration-200 ${
                                isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-[#F2951B]'
                            }`}
                        >
                            {isLoading ? 'Updating...' : 'Update User'}
                        </button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    );
}

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

export default function NewUsers() {
    const { auth } = usePage<{ auth: { user: UserModel } }>().props;

    const { data, setData, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<'success' | 'fail' | null>(null);

    function handleCreateUser() {
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        };
        const toastStatus = toast.loading('Adding User to database. Please wait!');
        setIsLoading(true);

        router.post(route('admin.users.store'), payload, {
            onError: () => {
                toast.dismiss(toastStatus);
                toast.error('Failed to input user. Invalid data input');
                setIsLoading(false);
            },
            onSuccess: () => {
                setTimeout(() => {
                    toast.dismiss(toastStatus);
                    toast.success('User added successfully! Redirecting back to User Page');
                    setData({
                        name: '',
                        email: '',
                        password: '',
                        role: '',
                    });
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
            <Head title="Input New User" />
            <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
                <Toaster richColors position="top-center" />
                <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-6 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">Input New User</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateUser();
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
                                placeholder="Password"
                            />
                            {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            >
                                <option value="">-- Select Role --</option>
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            {errors.role && <div className="text-sm text-red-500">{errors.role}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-md border bg-gray-200 py-2 text-black transition-colors duration-200 ${
                                isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-[#F2951B]'
                            }`}
                        >
                            {isLoading ? 'Creating...' : 'Create User'}
                        </button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    );
}

import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    users: UserModel[];
    [key: string]: any;
}

function generateAvatar(id: string): string {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
}

function getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
        case 'admin':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'teacher':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'student':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
}

export default function UsePage() {
    const { auth, users } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                (user.role && user.role.toLowerCase().includes(search.toLowerCase())),
        );
    }, [search, users]);

    return (
        <ContentLayout user={auth.user}>
            <Head title="User Lists" />

            <div className="px-6 py-4">
                <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">User Lists</h1>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredUsers.length} of {users.length} users
                </p>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name, email, or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>

                {filteredUsers.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No users found.</p>
                ) : (
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {filteredUsers.map((user: UserModel) => (
                            <div
                                key={user.id}
                                className="flex min-w-[20px] flex-shrink-0 items-center gap-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                            >
                                <img
                                    src={generateAvatar(user.id)}
                                    alt={`Avatar of ${user.name}`}
                                    className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '/default-avatar.svg';
                                    }}
                                />
                                <div className="min-w-0">
                                    <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                                    <p className="truncate text-xs text-gray-500 dark:text-gray-300">{user.email}</p>
                                    {user.role && (
                                        <span
                                            className={`mt-1 flex inline-block max-w-full flex-row justify-start truncate rounded px-2 py-0.5 text-xs font-medium ${getRoleColor(
                                                user.role,
                                            )}`}
                                        >
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ContentLayout>
    );
}

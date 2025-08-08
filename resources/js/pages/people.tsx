import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

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

export default function UserPage() {
    const { auth, users } = usePage<PageProps>().props;

    return (
        <ContentLayout user={auth.user}>
            <Head title="All Users" />

            <div className="px-6 py-4">
                <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">All Users</h1>

                {users.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No users found.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800"
                            >
                                <img src={generateAvatar(user.id)} alt={`Avatar of ${user.name}`} className="h-12 w-12 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-300">{user.email}</p>
                                    {user.role && (
                                        <p className="text-xs text-gray-400 italic dark:text-gray-400">
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </p>
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

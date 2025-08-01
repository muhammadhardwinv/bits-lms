import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    users: UserModel[];
    // Optional: courseId?: string;
    [key: string]: any; // <-- This line is required to satisfy Inertia's PageProps
}

function generateAvatar(id: string) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
}

export default function UserPage() {
    const { auth, users } = usePage<PageProps>().props;

    return (
        <ContentLayout user={auth.user}>
            <Head title="All Users" />
            <div className="grid grid-cols-1 gap-4 px-8 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-md dark:bg-slate-800">
                        <img src={generateAvatar(user.id)} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-300">{user.email}</p>
                            {user.role && <p className="text-xs text-gray-400 italic dark:text-gray-400">{user.role}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </ContentLayout>
    );
}

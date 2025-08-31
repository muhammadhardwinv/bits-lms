import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
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
    const [isLoading, setIsLoading] = useState(false);

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                (user.role && user.role.toLowerCase().includes(search.toLowerCase())),
        );
    }, [search, users]);

    const handleUpdateUser = (id: string) => {
        router.visit(route('admin.users.edit', id))
        console.log('coba');
    };

    const handleDeleteUser = async (id: string) => {
        setIsLoading(true);
        await router.delete(`/users/${id}`, {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <ContentLayout user={auth.user}>
            <Head title="User Lists" />

            <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
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
                                className="relative flex min-w-[20px] flex-shrink-0 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                            >
                                {/* Action Buttons - Top Right */}
                                <div className="absolute top-2 right-2 flex flex-col gap-1">
                                    {/* Edit Button with AlertDialog */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={(e) => e.stopPropagation()}
                                                className="cursor-pointer hover:bg-white dark:hover:bg-slate-700"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Edit user?</AlertDialogTitle>
                                                <AlertDialogDescription>Do you want to edit this user&apos;s details?</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleUpdateUser(user.id)}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    {/* Delete Button with AlertDialog */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                disabled={isLoading}
                                                onClick={(e) => e.stopPropagation()}
                                                className="cursor-pointer"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete user?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete this user? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>

                                {/* User Info */}
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

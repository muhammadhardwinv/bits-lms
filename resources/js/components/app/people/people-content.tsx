import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function People() {
    const { users } = usePage<{ users: any[] }>().props;

    const handleCreate = () => {
        router.visit('/admin/users/create');
    };

    const handleEdit = (id: number) => {
        router.visit(`/admin/users/${id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        const toastStatus = toast.loading('Deleting user...');
        setLoadingStates((prev) => ({ ...prev, [id]: true }));

        router.delete(`/admin/users/${id}`, {
            onError: () => {
                toast.dismiss(toastStatus);
                toast.error('Failed to delete user.');
                setLoadingStates((prev) => ({ ...prev, [id]: false }));
            },
            onSuccess: () => {
                toast.dismiss(toastStatus);
                toast.success('User deleted.');
                setLoadingStates((prev) => ({ ...prev, [id]: false }));
            },
        });
    };

    const generateAvatar = (id: number | string) => {
        return `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
    };

    const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

    return (
        <div className="pt-2 pr-8 pb-8 pl-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">User List</h1>
                <Button onClick={handleCreate} className="flex cursor-pointer items-center gap-2 bg-[#F2951B] text-white hover:bg-[#d98217]">
                    <Plus className="h-4 w-4" />
                    Add User
                </Button>
            </div>

            {users && users.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex cursor-pointer items-center gap-4 rounded-xl border bg-white p-4 shadow transition hover:bg-[#F2951B] dark:bg-slate-800"
                        >
                            <img src={generateAvatar(user.id)} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-300">{user.email}</p>
                                <p className="text-xs text-gray-500 capitalize dark:text-gray-300">{user.role}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleEdit(user.id)}
                                    className="cursor-pointer hover:bg-white dark:hover:bg-slate-700"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    className="cursor-pointer"
                                    size="icon"
                                    variant="destructive"
                                    disabled={loadingStates[user.id]}
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

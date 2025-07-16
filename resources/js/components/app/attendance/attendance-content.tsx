import { peopleData } from '@/lib/peopleData';
import { useUserStore } from '@/lib/store/userStore';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
useUserStore;

export interface SharedData {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    course?: string;
    [key: string]: any;
}

function generateAvatar(id: string) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
}

export default function AttendanceContent() {
    const { courseId } = usePage<SharedData>().props;
    const role = useUserStore((state) => state.role); // ✅ Get role from Zustand

    const filteredPeople = peopleData.filter((person) => person.courseId === courseId);

    const [attendance, setAttendance] = useState<{ [id: string]: 'Present' | 'Absent' | null }>({});

    const toggleAttendance = (id: string) => {
        setAttendance((prev) => ({
            ...prev,
            [id]: prev[id] === 'Present' ? 'Absent' : 'Present',
        }));
    };

    return (
        <>
            <Head title="Attendance" />
            <div className="grid grid-cols-1 gap-4 px-16 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPeople.map((person) => (
                    <div key={person.id} className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-md dark:bg-slate-800">
                        <div className="flex items-center gap-4">
                            <img src={generateAvatar(person.id)} alt={person.name} className="h-12 w-12 rounded-full object-cover" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{person.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-300">{person.email}</p>
                            </div>
                        </div>

                        {role === 'lecturer' && (
                            <button
                                onClick={() => toggleAttendance(person.id)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                                    attendance[person.id] === 'Present'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : attendance[person.id] === 'Absent'
                                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                            >
                                {attendance[person.id] ?? 'Mark Attendance'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

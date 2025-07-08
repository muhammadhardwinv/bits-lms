import { peopleData } from '@/lib/peopleData';
import { Head, usePage } from '@inertiajs/react';

export interface SharedData {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    course?: string;
    [key: string]: any; // ✅ allows other props without TS errors
}

// ✅ Avatar generator with correct domain
function generateAvatar(id: string) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
}

export default function PeopleContent() {
    const { courseId } = usePage<SharedData>().props;

    const filteredPeople = peopleData.filter((person) => person.courseId === courseId);

    return (
        <>
            <Head title="People" />
            <div className="px-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPeople.map((person) => (
                    <div key={person.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-md dark:bg-slate-800">
                        <img src={generateAvatar(person.id)} alt={person.name} className="h-12 w-12 rounded-full object-cover" />
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{person.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-300">{person.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

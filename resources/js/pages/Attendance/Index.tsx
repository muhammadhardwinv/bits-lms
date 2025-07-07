import ContentLayout from '@/layouts/content-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Student = {
    id: number;
    name: string;
};

type PageProps = {
    courseId: string;
    students: Student[];
};

export default function AttendancePage() {
    const { courseId, students } = usePage<PageProps>().props;

    const [attendance, setAttendance] = useState<Record<number, 'present' | 'absent' | null>>(Object.fromEntries(students.map((s) => [s.id, null])));

    const toggleAttendance = (id: number, status: 'present' | 'absent') => {
        setAttendance((prev) => ({ ...prev, [id]: status }));
    };
    return (
        <>
            <Head title="Attendance" />
            <ContentLayout>
                <div className="mx-auto max-w-3xl p-6">
                    <h1 className="mb-6 text-3xl font-bold">Attendance - {courseId}</h1>

                    <table className="w-full border text-left text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Name</th>
                                <th className="p-2 text-center">Present</th>
                                <th className="p-2 text-center">Absent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-t">
                                    <td className="p-2">{student.name}</td>
                                    <td className="p-2 text-center">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            checked={attendance[student.id] === 'present'}
                                            onChange={() => toggleAttendance(student.id, 'present')}
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            checked={attendance[student.id] === 'absent'}
                                            onChange={() => toggleAttendance(student.id, 'absent')}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Attendance Summary:</h2>
                        <ul className="mt-2 list-disc pl-6 text-gray-700">
                            {students.map((s) => (
                                <li key={s.id}>
                                    {s.name} —{' '}
                                    <span className={attendance[s.id] === 'present' ? 'text-green-600' : 'text-red-600'}>
                                        {attendance[s.id] ?? 'not marked'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </ContentLayout>
        </>
    );
}

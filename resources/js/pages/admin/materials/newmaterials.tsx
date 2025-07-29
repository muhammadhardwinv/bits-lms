import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { courses } from '@/lib/coursesDetails';
import { router, useForm } from '@inertiajs/react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function NewMaterials() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        teacherId: '',
        file: null as File | null,
    });

    const handleAddMaterials = () => {
        router.visit(route('admin.add.materials'));
    };

    const [selectedCourses, setSelectedCourses] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const initial: Record<string, boolean> = {};
        courses.forEach((course) => {
            initial[course.courseId] = false;
        });
        setSelectedCourses(initial);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
            <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">Upload New Material</h2>
                <form onSubmit={handleAddMaterials} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full rounded-md border px-3 py-2"
                        />
                        {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border px-3 py-2"
                        />
                        {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Add Course:
                            <br />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button type="button" className="mt-1 block w-full cursor-pointer rounded-md border px-3 py-2 text-left">
                                        {Object.entries(selectedCourses).filter(([_, val]) => val).length > 0
                                            ? courses
                                                  .filter((course) => selectedCourses[course.courseId])
                                                  .map((course) => `${course.courseId} - ${course.courseName}`)
                                                  .join(', ')
                                            : 'Select Courses'}
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="z-50 w-80 rounded-md bg-white">
                                    <DropdownMenuLabel> Course Name: </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {courses.map((course) => (
                                        <DropdownMenuCheckboxItem
                                            className="overflow-y-auto"
                                            key={course.courseId}
                                            checked={selectedCourses[course.courseId]}
                                            onCheckedChange={(checked) => {
                                                setSelectedCourses((prev) => ({ ...prev, [course.courseId]: checked }));
                                            }}
                                        >
                                            {course.courseId} — {course.courseName}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </label>
                        {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">File</label>
                        <input
                            type="file"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            className="mt-1 block w-full cursor-pointer rounded-lg border p-2 text-black"
                        />
                        {errors.file && <div className="text-sm text-red-500">{errors.file}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full cursor-pointer rounded-md border bg-gray-200 py-2 text-black hover:bg-[#F2951B]"
                    >
                        {processing ? 'Uploading...' : 'Upload Material'}
                    </button>
                </form>
            </div>
        </div>
    );
}

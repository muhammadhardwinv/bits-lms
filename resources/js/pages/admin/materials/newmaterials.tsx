import { FailAlert, SuccessAlert } from '@/components/app/alert/custom-alert';
import { router, useForm } from '@inertiajs/react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function NewMaterials() {
    const { data, setData, errors } = useForm({
        name: '',
        description: '',
        // teacherId: '',
        // file: null as File | null,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<'success' | 'fail' | null>(null);

    function handleCreateCourse() {
        const payload = {
            name: data.name,
            description: data.description,
        };
        router.post(route('admin.store.courses'), payload, {
            // console.log('anjing')
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                setAlertType('success');
                setTimeout(() => setAlertType(null), 3000);
            },
            onError: () => {
                setAlertType('fail');
                setTimeout(() => setAlertType(null), 3000);
            },
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center border border-gray-300 bg-gray-100 px-4">
            <div className="w-full max-w-lg space-y-6 rounded-2xl border border-gray-300 p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold text-black dark:text-[#F2951B]">Upload New Courses</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // ⛔ prevent reload
                        handleCreateCourse(); // ✅ your logic
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border px-3 py-2"
                        />
                        {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
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

                    {/* <div>
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
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">File</label>
                        <input
                            type="file"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            className="mt-1 block w-full cursor-pointer rounded-lg border p-2 text-black"
                        />
                        {errors.file && <div className="text-sm text-red-500">{errors.file}</div>}
                    </div> */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer rounded-md border bg-gray-200 py-2 text-black hover:bg-[#F2951B]"
                    >
                        {isLoading ? 'Creating...' : 'Create Material'}
                    </button>
                </form>
            </div>
            {alertType === 'success' && <SuccessAlert />}
            {alertType === 'fail' && <FailAlert />}
        </div>
    );
}

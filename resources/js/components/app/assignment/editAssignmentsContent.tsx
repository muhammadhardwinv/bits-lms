// components/app/assignment/assignmentsContent.tsx

type Props = {
    data: {
        title: string;
        description: string;
        courseId: string;
        classId: string;
        type: string;
        dueDate: string;
        link: string;
    };
    errors: Record<string, string>;
    setData: (field: string, value: string) => void;
};

export default function EditAssignmentsContent({ data, errors, setData }: Props) {
    return (
        <div className="space-y-4">
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
                    rows={4}
                />
                {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Course ID</label>
                <input
                    type="text"
                    value={data.courseId}
                    onChange={(e) => setData('courseId', e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Class ID</label>
                <input
                    type="text"
                    value={data.classId}
                    onChange={(e) => setData('classId', e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                    type="text"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                    type="date"
                    value={data.dueDate}
                    onChange={(e) => setData('dueDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                    type="text"
                    value={data.link}
                    onChange={(e) => setData('link', e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                />
            </div>
        </div>
    );
}

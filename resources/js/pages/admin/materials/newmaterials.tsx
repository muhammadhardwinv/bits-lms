import { router, useForm } from '@inertiajs/react';

export default function NewMaterials() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        file: null as File | null,
    });

    const handleAddMaterials = () => {
        router.visit(route('admin.add.materials'));
    };
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
                        <label className="block text-sm font-medium text-gray-700">File</label>
                        <input
                            type="file"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            className="mt-1 block w-full cursor-pointer rounded-lg border border-black p-2 text-black"
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

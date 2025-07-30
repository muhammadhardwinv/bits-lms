import { Info } from 'lucide-react';
import { toast } from 'sonner';

export function SuccessToast({ title }: { title: string }) {
    return toast.custom((t) => (
        <div
            className="flex cursor-pointer items-center justify-between space-x-8 rounded-md bg-green-700 px-4 py-3 text-white shadow-lg"
            onClick={() => toast.dismiss(t)}
        >
            <p className="font-semibold">{title}</p>
            <Info size={24} />
        </div>
    ));
}

export function FailToast({ title }: { title: string }) {
    return toast.custom((t) => (
        <div
            className="flex cursor-pointer items-center justify-between space-x-8 rounded-md bg-red-700 px-4 py-3 text-white shadow-lg"
            onClick={() => toast.dismiss(t)}
        >
            <p className="font-semibold">{title}</p>
            <Info size={24} />
        </div>
    ));
}

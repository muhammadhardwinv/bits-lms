interface CoursePanelProps {
    title: string;
}

export default function CPanelProps({ title }: CoursePanelProps) {
    return (
        <div className="flex h-20 w-full items-center justify-center rounded-xl bg-gray-200 shadow-md">
            <span>{title}</span>
        </div>
    );
}

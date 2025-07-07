interface GradebookCardProps {
    title: string;
    value: number;
}

export default function GradeBookCard({ title, value }: GradebookCardProps) {
    return (
        <div className="flex w-full items-center justify-between rounded-lg bg-gray-200 p-10">
            <span>{title}</span>
            <span>{value}</span>
        </div>
    );
}

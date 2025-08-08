interface GradebookCardProps {
    title: string;
    value: number;
}

export default function GradeBookCard({ title, value }: GradebookCardProps) {
    return (
        <div className="flex w-full items-center justify-between rounded-lg bg-gray-200 p-10 text-gray-800 transition-colors duration-300 dark:bg-white">
            <span>{title}</span>
            <span>{value}</span>
        </div>
    );
}

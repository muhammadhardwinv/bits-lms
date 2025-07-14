interface GradebookCardProps {
    title: string;
    value: number;
}

export default function GradeBookCard({ title, value }: GradebookCardProps) {
    return (
        <div className="flex w-full items-center justify-between rounded-lg bg-gray-200 p-10 text-gray-800 transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#121212] dark:to-[#1f1f1f] dark:text-white">
            <span>{title}</span>
            <span>{value}</span>
        </div>
    );
}

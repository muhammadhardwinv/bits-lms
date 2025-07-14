import { ForumContentType } from '@/lib/forumContent';
interface Props {
    forum: ForumContentType;
}
export function ForumDescription({ forum }: Props) {
    return (
        <>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Introduction to {forum.courseName}</h2>

                <div className="flex flex-row gap-3">
                    <div className="flex flex-col items-center items-start gap-1 text-gray-400">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Start:</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{forum.start}</p>
                    </div>

                    <div className="flex flex-col items-center items-start gap-1">
                        <h4 className="text-gray-400 dark:text-gray-200 text-sm font-semibold text-gray-800">End</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{forum.start}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

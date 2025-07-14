import { ForumContentType } from '@/lib/forumContent';
interface Props {
    forum: ForumContentType;
}
export function CourseDescription({ forum }: Props) {
    return (
        <>
            <div className="flex-1 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Introduction to {forum.courseName}</h2>

                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Learning Outcome</h3>
                    <p className="text-gray-700 dark:text-gray-300">{forum.learningOutcome}</p>
                </div>

                <div>
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Sub Topics</h4>
                    <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                        {forum.subTopics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

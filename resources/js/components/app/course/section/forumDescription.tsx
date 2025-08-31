import { ForumContentType } from '@/lib/forumContent';
import { SessionType } from '@/lib/types';

interface Props {
    forum: ForumContentType;
    sessions: SessionType[];
    schedule_dates?: string[]; // add this
}


export function ForumDescription({ forum, sessions, schedule_dates }: Props) {
    // Use the first schedule_date as start and last as end (example)
    const startDate = schedule_dates?.[0] || forum.start;
    const endDate = schedule_dates?.[schedule_dates.length - 1] || forum.end;
    

    return (
        <div className="flex h-full w-full flex-col justify-between py-4">
            <h2 className="m text-xl text-gray-900 dark:text-gray-100">Introduction to: {forum.courseName}</h2>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Learning Outcome</h2>
            <div className="mb-2">
                <h2 className="ml-4 text-sm text-gray-900 dark:text-gray-100">
                    &#9900; (C2) Comprehension : Describe the concept of the intelligent agent and Artificial Intelligence
                </h2>
            </div>
            <div>
                <h2 className="my-2 text-xl font-semibold text-gray-900 dark:text-gray-100">Sub Topics</h2>
                <h2 className="ml-4 text-sm text-gray-900 dark:text-gray-100">&#9900; Artificial Intelligence</h2>
                <h2 className="mb-4 ml-4 text-sm text-gray-900 dark:text-gray-100">&#9900; Foundation of Artificial Intelligence</h2>
            </div>
            <div className="flex flex-row gap-3">
                <div className="flex flex-col items-start gap-1 text-gray-400">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Start:</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{startDate}</p>
                </div>

                <div className="flex flex-col items-start gap-1">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">End</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{endDate}</p>
                </div>
            </div>
        </div>
    );
}

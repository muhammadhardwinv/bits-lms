import { Separator } from '@/components/ui/separator';
import { discussionThreads } from '@/lib/discussionContent';
import { forumContents, ForumContentType } from '@/lib/forumContent';
import { CourseDescription } from '../section/courseDescription';

interface Props {
    courseId: string;
    currentUrl: string;
}

export function SessionPanel({ courseId, currentUrl }: Props) {
    const cleanUrl = currentUrl.split(/[?#]/)[0];
    const sessionCount = discussionThreads.filter((d) => d.courseId === courseId).length;
    const sessionLinks = Array.from({ length: sessionCount }, (_, i) => ({
        label: `Session ${i + 1}`,
        href: `/current-session/${courseId}/session-${i + 1}`,
    }));

    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === courseId);

    return (
        <div w-full overflow-x-auto>
            <div className="w-max flex-row gap-1">
                <div className="flex flex-wrap justify-start py-2 text-center">
                    {sessionLinks.map((item, index) => {
                        const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);
                        const normalizedUrl = normalize(cleanUrl);
                        const normalizedHref = normalize(item.href);
                        const isActive = normalizedUrl === normalizedHref || normalizedUrl.startsWith(normalizedHref + '/');

                        return (
                            <a key={index} href={item.href} className="">
                                <div
                                    className={`mx-1 mb-3 flex flex-col items-center justify-center rounded-lg border px-2 py-2 text-sm font-medium shadow-sm transition duration-200 ${
                                        isActive
                                            ? 'border-indigo-300 bg-indigo-100 text-indigo-900 hover:bg-indigo-200 dark:border-indigo-700 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800'
                                            : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:underline hover:shadow-md dark:border-[#3a3a3a] dark:bg-[#1b1b1b] dark:text-gray-200 dark:hover:bg-gray-800'
                                    } flex items-center justify-center gap-1`}
                                >
                                    <span
                                        className={`text-center font-bold ${isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                                    ></span>
                                    <span>{item.label}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
            <Separator className="my-1" />
        </div>
    );
}

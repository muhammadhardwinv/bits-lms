import { Separator } from '@/components/ui/separator';
import { SessionType } from '@/lib/types';

interface Props {
    courseId: string;
    currentUrl: string;
    sessions: SessionType[];
}

export function SessionPanel({ courseId, currentUrl, sessions }: Props) {
    const cleanUrl = currentUrl.split(/[?#]/)[0];

    const sessionLinks = sessions.map((session, index) => ({
        label: `Session ${index + 1}`,
        href: `/sessions/${courseId}/session-${index + 1}`,
    }));

    return (
        <div className="w-full">
            <div className="w-max flex-row">
                <div className="mt-2 flex flex-wrap justify-start text-center">
                    {sessionLinks.map((item, index) => {
                        const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);

                        const normalizedUrl = normalize(cleanUrl);
                        const normalizedHref = normalize(item.href);

                        const isDefaultSession =
                            index === 0 &&
                            (normalizedUrl === `/sessions/${courseId}` ||
                                normalizedUrl === `/sessions/${courseId}/` ||
                                normalizedUrl === `/current-session/${courseId}` ||
                                normalizedUrl === `/current-session/${courseId}/`);

                        const isActive =
                            normalizedUrl === normalizedHref ||
                            normalizedUrl.startsWith(normalizedHref + '/') ||
                            (normalizedUrl === `/sessions/${courseId}` && index === 0) || // ✅ this makes Session 1 active
                            isDefaultSession;

                        return (
                            <a className="pb-0" key={index} href={item.href}>
                                <div
                                    className={`mx-1 mb-3 flex h-12 flex-col items-start justify-center rounded-lg border px-2 px-4 pr-6 pl-4 text-sm font-medium shadow-sm transition duration-200 ${
                                        isActive
                                            ? 'cursor-pointer bg-[#F2951B] text-white hover:shadow-lg dark:border-gray-400 dark:bg-[#1b1b1b] dark:bg-[#F2951B] dark:text-white dark:hover:bg-[#] dark:hover:shadow-lg'
                                            : 'cursor-pointer bg-[#f9b552] text-white hover:shadow-md dark:border-gray-400 dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#f9b552]/90'
                                    }`}
                                >
                                    <span
                                        className={`text-center font-bold ${
                                            isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                        }`}
                                    ></span>
                                    <span>{item.label}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
            <Separator className="" />
        </div>
    );
}

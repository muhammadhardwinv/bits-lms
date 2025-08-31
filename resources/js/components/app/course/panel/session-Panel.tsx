import { Separator } from '@/components/ui/separator';
import { SessionType } from '@/lib/types';

interface Props {
    courseId: string;
    currentUrl: string;
    sessions: SessionType[];
}

export function SessionPanel({ courseId, currentUrl, sessions }: Props) {
    const cleanUrl = (currentUrl ?? '').split(/[?#]/)[0];
    // Always default to 10 sessions
    const displaySessions: SessionType[] =
        sessions && sessions.length > 0
            ? sessions
            : Array.from({ length: 10 }, (_, i) => ({
                  id: `session-${i + 1}`, // ✅ ID as string
                  title: `Session ${i + 1}`,
                  description: 'TBA',
                  schedule_date: new Date().toISOString(),
                  course_id: courseId,
                  classroom_id: 'TBA',
              }));

    const sessionLinks = displaySessions.map((session, index) => ({
        label: `Session ${index + 1}`,
        href: `/sessions/${courseId}`,
    }));

    return (
        <div className="ml-5 w-full">
            <div className="w-max flex-row">
                <div className="mt-1 flex flex-wrap justify-start text-center">
                    {sessionLinks.map((item, index) => {
                        const normalize = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);

                        const normalizedUrl = normalize(cleanUrl);
                        const normalizedHref = normalize(item.href);

                        // Determine active session
                        const isActive = normalizedUrl === normalizedHref || normalizedUrl.startsWith(normalizedHref + '/');

                        // Fallback: if no session is active, set index 0 as default
                        const active = isActive || (index === 0 && !sessionLinks.some((s) => normalize(s.href) === normalizedUrl));

                        return (
                            <div className="flex justify-center py-2" key={index}>
                                <a className="flex flex-row items-center justify-center" href={item.href}>
                                    <div
                                        className={`-mx-1 -my-1 ml-1 flex h-12 flex-col items-start justify-center rounded-t-lg border px-4 text-sm font-medium shadow-sm transition duration-200 ${
                                            active
                                                ? 'cursor-pointer bg-[#F2951B] text-white hover:shadow-lg dark:bg-[#1b1b1b] dark:bg-[#F2951B] dark:text-white'
                                                : 'cursor-pointer bg-gray-200 text-black hover:shadow-md dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#f9b552]/90'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                    </div>
                                </a>
                            </div>
                        );
                    })}

                    <Separator className="ml-1.5 border border-b-2 border-[#F2951B]" />
                </div>
            </div>
        </div>
    );
}


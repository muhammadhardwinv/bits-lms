import { Button } from '@/components/ui/button';
import { discussionThreads } from '@/lib/discussionContent';
import { getThreadsForSession, storeNewDiscussion } from '@/lib/discussionStorage';
import { ForumContentType, forumContents } from '@/lib/forumContent';
import { useUserStore } from '@/lib/store/userStore';
import { UserModel } from '@/lib/types';
import { useEffect, useState } from 'react';
import { SessionPanel } from '../course/panel/session-Panel';
import { ForumDescription } from '../course/section/forumDescription';

interface Props {
    courseId: string;
    user?: UserModel;
}

export default function DiscussionContent({ courseId, user }: Props) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === courseId);
    const initialThreads = discussionThreads.filter((thread) => thread.courseId === courseId);

    const totalSessions = Math.ceil(initialThreads.length / 3);
    const initialSessions = Array.from({ length: totalSessions }, (_, i) => `Session ${i + 1}`);

    const [sessions, setSessions] = useState(initialSessions);
    const [threads] = useState(initialThreads);
    const [selectedSession, setSelectedSession] = useState<number>(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newStudentArgument, setNewStudentArgument] = useState('');

    if (!forum) {
        {
            console.warn(`Forum not found for course ID: ${courseId}`, courseId);
            console.log(`Forum not found for course ID: ${courseId}`, courseId);
        }
        return <p className="flex h-[50vh] flex-col justify-center text-center text-gray-500">Forum not found for this course.</p>; // ✅ return JSX instead
    }

    const storedThreads = getThreadsForSession(courseId, selectedSession);
    const sessionThreads = [...threads.slice((selectedSession - 1) * 3, selectedSession * 3), ...storedThreads];

    function handleCreateSession() {
        const newSessionNumber = sessions.length + 1;
        const newSessionTitle = `Session ${newSessionNumber}`;
        setSessions((prev) => [...prev, newSessionTitle]);
        setSelectedSession(newSessionNumber);
        setIsDialogOpen(false);
    }

    function handlePostThread() {
        if (!newStudentArgument.trim() || !forum) return;
        setNewStudentArgument('');
    }

    return (
        <div className="space-y-8 px-6">
            <div className="w-full">
                {/* <SessionPanel courseId={courseId} currentUrl="{url}" /> */}
                <div className="my-6">
                    <ForumDescription forum={forum} />
                </div>
                {/* Comment Area */}
                <textarea
                    value={newStudentArgument}
                    onChange={(e) => setNewStudentArgument(e.target.value)}
                    placeholder="Write a question or topic to discuss..."
                    className="mt-6 w-full rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-800 transition-colors duration-200 dark:border-gray-600 dark:bg-[#1f1f1f] dark:text-gray-200"
                    rows={4}
                />
                <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={handlePostThread} disabled={!newStudentArgument.trim()}>
                        Post Discussion
                    </Button>
                </div>
                {/* Comment Area */}
            </div>

            <div className="space-y-6">
                {/* Section Discussion dan Comment */}
                {sessionThreads.length > 0 ? (
                    sessionThreads.map((thread, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-300 bg-white p-6 text-gray-800 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-[#1f1f1f] dark:text-gray-200"
                        >
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{thread.timestampStudent}</p>
                            <p className="font-semibold text-gray-800 dark:text-white">{thread.studentName}:</p>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{thread.studentArgument}</p>

                            {thread.lecturerResponse && (
                                <>
                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{thread.timestampLecturer}</p>
                                    <p className="font-semibold text-blue-900 dark:text-blue-300">{thread.lecturerName} (Lecturer):</p>
                                    <p className="text-gray-800 dark:text-gray-200">{thread.lecturerResponse}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No discussions for this session.</p>
                )}
                {/* Section Discussion dan Comment */}
            </div>
        </div>
    );
}

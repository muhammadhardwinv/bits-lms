import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { discussionThreads } from '@/lib/discussionContent';
import { getThreadsForSession, storeNewDiscussion } from '@/lib/discussionStorage';
import { ForumContentType, forumContents } from '@/lib/forumContent';
import { useUserStore } from '@/lib/store/userStore';
import { UserModel } from '@/lib/types';
import { useEffect, useState } from 'react';

interface Props {
    courseId: string;
    user?: UserModel;
}

export default function DiscussionContent({ courseId, user }: Props) {
    const { role, name, setUser } = useUserStore();

    // ✅ Correct useEffect including setUser in the dependency array
    useEffect(() => {
        if (user) {
            setUser({
                name: user.name,
                role: user.role as 'student' | 'lecturer',
            });
        }
    }, [user, setUser]);

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
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {courseId}</h1>
            </div>
        );
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

        const posterName = name?.trim() || (role === 'lecturer' ? 'Lecturer' : 'Student');
        storeNewDiscussion(
            forum.courseId,
            forum.classId,
            forum.lecturerId,
            forum.lecturerName,
            forum.forumTitle,
            newStudentArgument,
            selectedSession,
            posterName,
        );

        setNewStudentArgument('');
    }

    return (
        <div className="space-y-8 p-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold">{forum.forumTitle}</h1>
                <p className="text-xl text-gray-600">{forum.courseId}</p>
                <p className="mt-8 ml-16 text-lg font-semibold">{forum.lecturerName}</p>
                <p className="text-md ml-16 text-gray-500">{forum.lecturerId}</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="grid grid-cols-6 gap-4 border-y py-6">
                    {sessions.map((sessionName, i) => {
                        const sessionNumber = i + 1;
                        return (
                            <button
                                key={sessionNumber}
                                type="button"
                                onClick={() => setSelectedSession(sessionNumber)}
                                className={`rounded-lg border px-4 py-3 text-sm font-medium transition duration-200 ${
                                    selectedSession === sessionNumber
                                        ? 'border-blue-600 bg-blue-100 text-blue-900 shadow-md'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {sessionName}
                            </button>
                        );
                    })}
                </div>

                {role === 'lecturer' && (
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="ml-4">
                                + New Session
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Create New Session</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCreateSession}>Create</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <div className="mt-6 w-full">
                <textarea
                    value={newStudentArgument}
                    onChange={(e) => setNewStudentArgument(e.target.value)}
                    placeholder="Write a question or topic to discuss..."
                    className="w-full rounded-md border border-gray-300 p-3 text-sm"
                    rows={4}
                />
                <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={handlePostThread} disabled={!newStudentArgument.trim()}>
                        Post Discussion
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {sessionThreads.length > 0 ? (
                    sessionThreads.map((thread, index) => (
                        <div key={index} className="rounded-lg border p-6 shadow-sm">
                            <p className="mb-1 text-sm text-gray-500">{thread.timestampStudent}</p>
                            <p className="font-semibold text-gray-800">{thread.studentName}:</p>
                            <p className="mb-4 text-gray-700">{thread.studentArgument}</p>

                            {thread.lecturerResponse && (
                                <>
                                    <p className="mb-1 text-sm text-gray-500">{thread.timestampLecturer}</p>
                                    <p className="font-semibold text-blue-900">{thread.lecturerName} (Lecturer):</p>
                                    <p className="text-gray-800">{thread.lecturerResponse}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No discussions for this session.</p>
                )}
            </div>
        </div>
    );
}

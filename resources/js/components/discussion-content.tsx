import { discussionThreads } from '@/lib/discussionContent';
import { ForumContentType, forumContents } from '@/lib/forumContent';
import { UserModel } from '@/lib/types';
import { useState } from 'react';

interface Props {
    user: UserModel;
    courseId: string;
}

export default function DiscussionContent({ user, courseId }: Props) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === courseId);
    const [selectedSession, setSelectedSession] = useState<number>(1);

    if (!forum) {
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {courseId}</h1>
            </div>
        );
    }
    const allCourseThreads = discussionThreads.filter((thread) => thread.courseId === courseId);
    const totalSessions = Math.ceil(allCourseThreads.length / 3);
    const courseThreads = allCourseThreads.slice((selectedSession - 1) * 3, selectedSession * 3);

    return (
        <div className="space-y-8 p-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold">{forum.forumTitle}</h1>
                <p className="text-xl text-gray-600">{forum.courseId}</p>
                <p className="mt-8 ml-16 text-lg font-semibold">{forum.lecturerName}</p>
                <p className="text-md ml-16 text-gray-500">{forum.lecturerId}</p>
            </div>

            <div className="grid grid-cols-6 gap-4 border-y py-6">
                {[...Array(totalSessions)].map((_, i) => {
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
                            Session {sessionNumber}
                        </button>
                    );
                })}
            </div>
            <div className="space-y-6">
                {courseThreads.map((thread, index) => (
                    <div key={index} className="rounded-lg border p-6 shadow-sm">
                        <p className="mb-1 text-sm text-gray-500">{thread.timestampStudent}</p>
                        <p className="font-semibold text-gray-800">{thread.studentName}:</p>
                        <p className="mb-4 text-gray-700">{thread.studentArgument}</p>

                        <p className="mb-1 text-sm text-gray-500">{thread.timestampLecturer}</p>
                        <p className="font-semibold text-blue-900">{thread.lecturerName} (Lecturer):</p>
                        <p className="text-gray-800">{thread.lecturerResponse}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// backup static

//             <div className="space-y-1">
//                 <h1 className="text-4xl font-bold">forumTitle</h1>
//                 <p className="text-xl text-gray-600">courseId</p>
//                 <p className="mt-8 ml-16 text-lg font-semibold">lecturerName</p>
//                 <p className="text-md ml-16 text-gray-500">lecturerId</p>
//             </div>

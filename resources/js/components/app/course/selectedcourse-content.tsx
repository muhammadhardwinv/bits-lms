import { Card, CardContent } from '@/components/ui/card';
import { ForumContentType, forumContents } from '@/lib/forumContent';
import LecturerCard from './lecturercourse-Card';
import StudentCard from './studentcourse-Card';

interface Props {
    role: 'student' | 'lecturer';
    courseId: string;
}

export default function SelectedCourseContent({ role, courseId }: Props) {
    const forum: ForumContentType | undefined = forumContents.find((f) => f.courseId === courseId);

    if (!forum) {
        return (
            <div className="p-6 text-red-600">
                <h1 className="text-xl font-semibold">Forum not found for course ID: {courseId}</h1>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold">{forum.forumTitle}</h1>
                <p className="text-xl text-gray-600">{forum.courseId}</p>
                <p className="mt-8 ml-16 text-lg font-semibold">{forum.lecturerName}</p>
                <p className="text-md ml-16 text-gray-500">{forum.lecturerId}</p>
            </div>

            <div className="grid grid-cols-6 gap-4 border-y py-6">
                {[
                    { label: 'Session', href: `/courses/${forum.courseId}/slideshow` },
                    { label: 'Discussion', href: `/discussion/${forum.courseId}` },
                    { label: 'Assessment', href: `/assignment/${forum.courseId}` },
                    { label: 'Gradebook', href: `/gradebook/${forum.courseId}` },
                    { label: 'People', href: '#' }, // Not defined in routes yet
                    { label: 'Attendance', href: '#' }, // Not defined in routes yet
                ].map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-6 text-sm font-medium text-gray-800 shadow-sm transition duration-200 hover:bg-gray-50 hover:underline hover:shadow-md"
                    >
                        <a href={item.href}>{item.label}</a>
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-semibold">Introduction to {forum.courseName}</h2>

                    <div>
                        <h3 className="text-lg font-bold">Learning Outcome</h3>
                        <p className="text-gray-700">{forum.learningOutcome}</p>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold">Sub Topics</h4>
                        <ul className="list-disc pl-6 text-gray-700">
                            {forum.subTopics.map((topic, i) => (
                                <li key={i}>{topic}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Card className="h-fit w-full shadow-lg lg:w-72">
                    <CardContent className="space-y-4 p-6">
                        <h3 className="mb-6 text-lg font-semibold">Things to do in this session</h3>

                        <nav className="flex flex-col gap-2 text-blue-600">
                            {role === 'lecturer' && <LecturerCard courseId={courseId} />} {role === 'student' && <StudentCard courseId={courseId} />}
                        </nav>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

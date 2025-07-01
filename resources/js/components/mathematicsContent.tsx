import { Card, CardContent } from './ui/card';
import { UserModel } from '@/lib/types';
import StudentCard from './studentCard';
import LecturerCard from './lecturerCard';

export default function MathematicsContent({ user }: { user: UserModel }) {
    return (
        <div className="space-y-8 p-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold">Mathematics</h1>
                <p className="text-xl text-gray-600">MATH101</p>
                <p className="mt-8 ml-16 text-lg font-semibold">Lecturer Name</p>
                <p className="text-md ml-16 text-gray-500">ID-XXXX</p>
            </div>

            <div className="grid grid-cols-6 gap-4 border-y py-6">
                {[1, 2, 3, 4, 5, 6].map((session) => (
                    <button
                        key={session}
                        type="submit"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-6 text-sm font-medium text-gray-800 shadow-sm transition duration-200 hover:bg-gray-50 hover:underline hover:shadow-md"
                    >
                        <a href="#">Session {session}</a>
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-semibold">Introduction to Mathematics</h2>

                    <div>
                        <h3 className="text-lg font-bold">Learning Outcome</h3>
                        <p className="text-gray-700">
                            By the end of this course, students will understand fundamental mathematical principles, be able to apply algebraic
                            techniques, and solve real-world problems using quantitative reasoning.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold">Sub Topics</h4>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Introduction to Numbers</li>
                            <li>Basic Algebra</li>
                            <li>Geometry Essentials</li>
                        </ul>
                    </div>
                </div>

                <Card className="h-fit w-full shadow-lg lg:w-72">
                    <CardContent className="space-y-4 p-6">
                        <h3 className="text-lg font-semibold">Things to do in this session</h3>
                        <nav className="flex flex-col gap-2 text-blue-600">
                            <LecturerCard user={user} />
                            <StudentCard user={user} />
                        </nav>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { Separator } from '@/components/ui/separator';
import { ClassesType, CourseModel, SessionType, UserModel } from '@/lib/types';
import CourseSessions from '@/pages/sessions';
import { usePage } from '@inertiajs/react';

interface Props {
    auth: { user: UserModel };
    course: CourseModel;
    courseSessions: SessionType[];
    classes: ClassesType; // ✅ required
}

export default function CourseDescriptionContents({ auth, course, courseSessions, classes }: Props) {
    const { url } = usePage();
    const session = courseSessions.at(0); // Show only the first session

    return (
        <div className="relative">
            {session ? (
                <div className="bg-white pt-1 pr-4 pb-1 pl-4 dark:bg-[#1c1c1c] dark:text-white">
                    <h2 className="text-lg text-gray-800 dark:text-white">Introduction to: {classes.name}</h2>
                    <h2 className="text-md mt-1 font-black text-gray-800 dark:text-white">Learning Outcome:</h2>
                    <h2 className="my-2 text-sm text-gray-800 dark:text-white">
                        - (C2) Comprehension : Describe the concept of the intelligent agent and Artificial Intelligence
                    </h2>
                    <h2 className="text-md my-2 font-black text-gray-800 dark:text-white">Sub Topic</h2>
                    <h2 className="mt-1 text-sm text-gray-800 dark:text-white">- Sub Topic A</h2>
                    <h2 className="my-2 text-sm text-gray-800 dark:text-white">- Sub Topic B</h2>
                    <Separator className="mx-1 my-1 pr-30" />
                    <p className="my-2 text-sm text-gray-400 dark:text-white">Start </p>
                    <p className="my-1 text-sm text-black dark:text-white">
                        {courseSessions.length > 0 ? new Date(courseSessions[0].schedule_date!).toLocaleDateString() : 'No date'}
                    </p>{' '}
                    <p className="my-2 text-sm text-gray-400 dark:text-white">End </p>
                    <p className="my-1 text-sm text-black dark:text-white">
                        {courseSessions.length > 0 ? new Date(courseSessions[0].schedule_date!).toLocaleDateString() : 'No date'}
                    </p>{' '}
                    <p className="my-2 text-sm text-gray-400 dark:text-white">Delivery Mode </p>
                    <p className="my-1 text-sm text-black dark:text-white">Onsite - F2F</p>
                </div>
            ) : (
                <p className="text-sm text-gray-500">No sessions available.</p>
            )}
        </div>
    );
}

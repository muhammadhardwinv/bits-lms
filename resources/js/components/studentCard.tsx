import { courses } from '@/lib/newAssignment';
import { UserModel } from '@/lib/types';
import { Link } from '@inertiajs/react';
import { Download } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';

interface Props {
    user: UserModel;
    courseId: string;
}

const course = courses[0]; // optional: filter based on courseId if needed
const safeCourseName = course.courseName.replace(/\s+/g, '-').toLowerCase();

export default function StudentCard({ user, courseId }: Props) {
    if (user.role === 'lecturer') return null;

    return (
        <nav className="flex flex-col gap-3 text-sm text-blue-600">
            {/* PPT */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="flex flex-row items-center gap-3 hover:underline">
                        <h2>[PPT] Introduction to {course.courseName}</h2>
                        <span className="flex flex-row items-center">
                            (<Download className="h-4 w-4" />)
                        </span>
                    </a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will add or replace the slideshow for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={`/courses/${courseId}/slideshow`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Forums */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover:underline">Go to Forums Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will open the course's discussion forum.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={`/discussion/${courseId}`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover:underline">Go to Assignment Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This opens the assignment page for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={`/assignment/${safeCourseName}/${courseId}`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Quiz */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover:underline">Go to Quiz Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This opens the quiz overview for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={`/assignment/${safeCourseName}/${courseId}/quiz`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Exam — optional, no route defined yet */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover:underline">Go to Exam Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This opens the exam results for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={`/courses/${courseId}/exam`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </nav>
    );
}

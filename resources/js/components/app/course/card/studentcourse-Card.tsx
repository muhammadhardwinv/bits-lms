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
} from '@/components/ui/alert-dialog';
import { courses } from '@/lib/newAssignment';
import { Link } from '@inertiajs/react';
import { Download } from 'lucide-react';

interface Props {
    courseId: string;
}

const course = courses[0]; // optional: filter based on courseId if needed
const safeCourseName = course.courseName.replace(/\s+/g, '-').toLowerCase();

export default function StudentCard({ courseId }: Props) {
    return (
        <nav className="flex flex-col gap-3 text-sm text-blue-600">
            {/* PPT */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover flex cursor-pointer flex-row items-center gap-3">
                        <h2> (PPT) Introduction to {course.courseName}</h2>
                        <span className="flex flex-row items-center">
                            <Download className="mb-1 h-4 w-4" />
                        </span>
                    </a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will add or replace the slideshow for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link className="cursor-pointer" href={`/courses/${courseId}/slideshow`}>
                                Yes
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="cursor-pointer">Go to Forums Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will open the course's discussion forum.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link className="cursor-pointer" href={`/discussion/${courseId}`}>
                                Yes
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="cursor-pointer">Go to Quiz Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This opens the quiz overview for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link className="cursor-pointer" href={`/${courseId}/quiz`}>
                                Yes
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Exam — optional, no route defined yet */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="cursor-pointer">Go to Exam Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This opens the exam results for this course.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link className="cursor-pointer" href={`/courses/${courseId}/exam`}>
                                Yes
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </nav>
    );
}

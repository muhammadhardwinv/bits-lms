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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { courses } from '@/lib/newAssignment';
import { Link } from '@inertiajs/react';
import { ClipboardList, Download, HelpCircle } from 'lucide-react';

interface Props {
    courseId: string;
}

const course = courses[0];
const safeCourseName = course.courseName.replace(/\s+/g, '-').toLowerCase();

export default function LecturerCard({ courseId }: Props) {
    return (
        <nav className="flex flex-col gap-3 text-sm text-blue-600">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover flex flex-row items-center gap-3">
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
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={`/courses/${courseId}/slideshow`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="">Go to Forums Page</a>
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
                            <Link href={`/${courseId}/quiz`}>Yes</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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

            {/* Add New Items */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="mt-3 flex items-center justify-center">
                        <span className="text-xl">+</span>
                        <span>Add New Items</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Select what to add</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Link href={`/courses/${safeCourseName}/new-assignment`} className="block">
                            <Card className="cursor-pointer transition hover:bg-muted/60">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <ClipboardList className="mb-2 h-8 w-8 text-green-500" />
                                    <span className="text-center font-medium">Assignment</span>
                                </CardContent>
                            </Card>
                        </Link>

                        <Card className="cursor-pointer transition hover:bg-muted/60" onClick={() => console.log('Add Quiz')}>
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <HelpCircle className="mb-2 h-8 w-8 text-yellow-500" />
                                <span className="text-center font-medium">Quiz</span>
                            </CardContent>
                        </Card>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </nav>
    );
}

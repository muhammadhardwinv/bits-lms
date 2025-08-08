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
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, ClipboardList, Download, HelpCircle } from 'lucide-react';

interface Props {
    courseId: string;
}

const course = courses[0];
const safeCourseName = course.courseName.replace(/\s+/g, '-').toLowerCase();
const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/files/Powerpoint.pdf';
    link.download = 'Powerpoint.pdf'; // optional: force download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function TeacherCard({ courseId }: Props) {
    return (
        <nav className="flex flex-col gap-3 text-sm">
            {/* PPT Upload / View */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="gap flex flex-row items-center justify-start">
                        <a className="flex cursor-pointer flex-row items-center gap-3 rounded-sm px-1 py-1 text-black hover:bg-black dark:text-black">
                            <h2> PPT - Introduction to {course.courseName}</h2>
                        </a>
                        <AlertDialogTrigger>
                            <a className="flex cursor-pointer flex-row">
                                <div className="group relative mb-1 ml-2 items-center">
                                    <button
                                        onClick={handleDownload}
                                        className="h-full w-full cursor-pointer items-center rounded p-1 text-xs text-blue-500 hover:bg-black dark:text-black"
                                    >
                                        <Download size={20} className="w-full text-black dark:text-black" />
                                    </button>

                                    <div className="group relative">
                                        <button className="absolute top-full left-1/2 mt-2 w-max -translate-x-1/2 scale-0 transform cursor-pointer rounded !bg-black px-2 py-1 text-sm text-black opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                                            Download PPT
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </AlertDialogTrigger>
                    </div>
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

            {/* Forums Page */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="w-fit cursor-pointer rounded-sm px-1 py-1 text-black hover:bg-black dark:text-black">Go to Forums Page</a>
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

            {/* Quiz Page */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="w-fit cursor-pointer rounded-sm px-1 py-1 text-black hover:bg-black dark:text-black">Go to Quiz Page</a>
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

            {/* Exam Page */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="w-fit cursor-pointer rounded-sm px-1 py-1 text-black hover:bg-black dark:text-black">Go to Exam Page</a>
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

            {/* Add New Items */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="mt-3 flex cursor-pointer items-center justify-center bg-white text-black hover:bg-black hover:text-black dark:text-black">
                        <span className="text-xl">+</span>
                        <span>Add New Items</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
                    <AlertDialogHeader>
                        <div className="relative flex h-8 items-center justify-center">
                            <AlertDialogTrigger asChild>
                                <Button className="absolute left-4 cursor-pointer bg-white text-black hover:bg-black dark:bg-black dark:text-black dark:hover:bg-[#C17715]">
                                    <ArrowLeft />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogTitle>Select what to add</AlertDialogTitle>
                        </div>
                    </AlertDialogHeader>

                    <div className="flex flex-col gap-4">
                        <Card
                            onClick={() => router.visit(`/${courseId}/new-assignment`)}
                            className="cursor-pointer transition hover:bg-black dark:hover:bg-black"
                        >
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <ClipboardList className="mb-2 h-8 w-8 text-green-500" />
                                <span className="text-center font-medium">Assignment</span>
                            </CardContent>
                        </Card>

                        <Card
                            onClick={() => router.visit(`/${courseId}/quiz`)}
                            className="cursor-pointer transition hover:bg-black dark:hover:bg-black"
                        >
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

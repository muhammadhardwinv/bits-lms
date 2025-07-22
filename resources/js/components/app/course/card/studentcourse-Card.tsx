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
import { Tooltip } from 'recharts';

interface Props {
    courseId: string;
}

const course = courses[0]; // optional: filter based on courseId if needed
const safeCourseName = course.courseName.replace(/\s+/g, '-').toLowerCase();
const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/files/Powerpoint.pdf';
    link.download = 'Powerpoint.pdf'; // optional: force download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
export default function StudentCard({ courseId }: Props) {
    return (
        <nav className="flex flex-col gap-3 text-sm text-black dark:text-white">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="gap flex flex-row items-center justify-start">
                        <a className="flex cursor-pointer flex-row items-center gap-3 rounded-sm px-1 py-1 text-black hover:bg-[#F2951B] dark:text-white">
                            <h2> PPT - Introduction to {course.courseName}</h2>
                        </a>
                        <a className="flex cursor-pointer flex-row">
                            <div className="group relative mb-1 ml-2 items-center">
                                <button
                                    onClick={handleDownload}
                                    className="h-full w-full cursor-pointer items-center rounded p-1 text-xs text-blue-500 hover:bg-[#F2951B] dark:text-white"
                                >
                                    <Download size={20} className="text-black dark:text-white" />
                                </button>

                                <div className="group relative">
                                    <button className="absolute top-full left-1/2 mt-2 w-max -translate-x-1/2 scale-0 transform cursor-pointer rounded !bg-gray-200 px-2 py-1 text-sm text-black opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                                        Download PPT
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will navigate to Slideshow Page.</AlertDialogDescription>
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
                    <a className="cursor-pointer rounded-sm px-1 py-1 text-black hover:bg-[#F2951B] dark:text-white">Navigate to Forums Page</a>
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
                    <a className="cursor-pointer rounded-sm px-1 py-1 text-black hover:bg-[#F2951B] dark:text-white">Go to Quiz Page</a>
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

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="cursor-pointer rounded-sm px-1 py-1 text-black hover:bg-[#F2951B] dark:text-white">Go to Exam Page</a>
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

import { UserModel } from '@/lib/types';
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
import { BookOpenText, ClipboardList, Download, HelpCircle, MessageSquareText } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Props {
    user: UserModel;
}

export default function LecturerCard({ user }: Props) {
    if (user.role === 'student') return null;

    return (
        <nav className="flex flex-col gap-2 text-sm text-blue-600">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="flex flex-row items-center gap-3 hover:underline">
                        <h2>[PPT] Introduction to Algebra</h2>
                        <span className="flex flex-row items-center">
                            ( <Download className="h-4 w-4" />)
                        </span>
                    </a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will either add a new PowerPoint or replace the existing one, and make it visible to
                            all students.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <a href="/courses/mathematics/slideshow">Yes</a>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover:underline">Go to Forums Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will take you to the course discussion forum where you can view all threads.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <a href="/courses/mathematics/forums">Yes</a>
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
                        <AlertDialogDescription>This will open the quiz overview page and display any active or past quizzes.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <a href="/courses/mathematics/quiz">Yes</a>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <a className="hover:underline">Go to Exam Page</a>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will open the exam results page for you to view and analyze student submissions.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <a href="/courses/mathematics/exam">Yes</a>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-center">
                        <span className="text-xl">+</span>
                        <span>Add New</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Select what to add</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Card className="cursor-pointer transition hover:bg-muted/60" onClick={() => console.log('Add Thread')}>
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <BookOpenText className="mb-2 h-8 w-8 text-blue-500" />
                                <span className="text-center font-medium">Material</span>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer transition hover:bg-muted/60" onClick={() => console.log('Add Assignment')}>
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <ClipboardList className="mb-2 h-8 w-8 text-green-500" />
                                <span className="text-center font-medium">Assignment</span>
                            </CardContent>
                        </Card>

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

import { courses } from '@/lib/newAssignment';
import { usePage } from '@inertiajs/react';
import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const assignment = courses[0];

type UserModel = {
    name: string;
    role: string;
};

export default function NewAssignmentsContent() {
    const { props } = usePage<{ courseName: string }>();
    const courseName = props.courseName;
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<{ response?: string; attachment?: string }>({});

    const [response, setResponse] = React.useState('');
    const [attachment, setAttachment] = React.useState<File | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!response) {
            setErrors({ response: 'Response is required.' });
            setLoading(false);
            return;
        }

        console.log('Assignment submitted: ', { response, attachment });
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <Card className="w-full max-w-4xl rounded-2xl border p-6 shadow-md">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.description}</CardDescription>

                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-left text-sm text-muted-foreground">
                        <p>
                            <strong>Course ID:</strong> {assignment.courseId}
                        </p>
                        <p>
                            <strong>Class ID:</strong> {assignment.classId}
                        </p>
                        <p>
                            <strong>Type:</strong> {assignment.type}
                        </p>
                        <p>
                            <strong>Due Date:</strong> {assignment.dueDate}
                        </p>
                    </div>
                </CardHeader>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5 p-0">
                        {/* RESPONSE TEXTAREA */}
                        <div>
                            <Label htmlFor="response" className="text-sm font-medium">
                                Your Solution (Explain your approach or paste your code)
                            </Label>
                            <Textarea
                                id="response"
                                className="mt-1 h-60"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Describe your algorithm, provide analysis, or paste your code..."
                            />
                            {errors.response && <p className="mt-1 text-sm text-red-500">{errors.response}</p>}
                        </div>

                        {/* ATTACHMENT */}
                        <div>
                            <Label htmlFor="attachment" className="text-sm font-medium">
                                Submit Code File (Python, Java, etc.)
                            </Label>
                            <Input id="attachment" type="file" className="mt-1" onChange={(e) => setAttachment(e.target.files?.[0] || null)} />
                            {errors.attachment && <p className="mt-1 text-sm text-red-500">{errors.attachment}</p>}
                        </div>
                    </CardContent>

                    {/* SUBMIT BUTTON */}
                    <CardFooter className="justify-center pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Submit Assignment'}
                        </button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

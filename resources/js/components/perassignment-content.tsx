import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type Assignment = {
    title: string;
    description?: string;
    courseId: string;
    classId: string;
    type: string;
    dueDate: string;
};

type UserModel = {
    name: string;
    role: string;
};

export default function PerAssignmentContent({
    assignment,
    user,
    onSubmit,
    loading = false,
    errors = {},
    sidebarOpen = true,
    sidebarClose = false,
}: {
    assignment: Assignment;
    user: UserModel;
    onSubmit: (data: { response: string; attachment: File | null }) => void;
    loading?: boolean;
    errors?: {
        response?: string;
        attachment?: string;
    };
    sidebarOpen?: boolean;
    sidebarClose?: boolean;
}) {
    const [response, setResponse] = React.useState('');
    const [attachment, setAttachment] = React.useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ response, attachment });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-[75%] rounded-2xl border p-6 shadow-md">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle>{assignment.title}</CardTitle>
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
                            <Label htmlFor="response">Your Response</Label>
                            <Textarea
                                id="response"
                                className="mt-1 h-60"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Write your response here..."
                            />
                            {errors.response && <p className="mt-1 text-sm text-red-500">{errors.response}</p>}
                        </div>

                        {/* ATTACHMENT */}
                        <div>
                            <Label htmlFor="attachment">Attachment (optional)</Label>
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
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

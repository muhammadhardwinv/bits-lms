import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ContentLayout from '@/layouts/content-layout';
import { ClipboardList } from 'lucide-react';
import React from 'react';

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
}: {
    assignment: Assignment;
    user: UserModel;
    onSubmit: (data: { response: string; attachment: File | null }) => void;
    loading?: boolean;
    errors?: {
        response?: string;
        attachment?: string;
    };
}) {
    const [response, setResponse] = React.useState('');
    const [attachment, setAttachment] = React.useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ response, attachment });
    };

    return (
        <ContentLayout>
            <div className="mx-auto w-full max-w-[1400px] space-y-10 px-8 text-base">
                <div className="col-span-6">
                    <div className="overflow-y-auto rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:from-[#121212] dark:to-[#1f1f1f]">
                        <div className="mb-6 flex items-center justify-between border-b pb-4 dark:border-gray-600">
                            <div className="flex items-center gap-3">
                                <ClipboardList className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{assignment.title}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Submit your response for the assignment below.</p>
                                </div>
                            </div>
                        </div>

                        <Card className="mb-6">
                            <CardContent className="space-y-6 px-6 pt-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                                    <Badge variant="secondary" className="text-xs">
                                        {assignment.type}
                                    </Badge>
                                </div>

                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Course ID: <span className="font-medium text-indigo-700 dark:text-indigo-400">{assignment.courseId}</span> — Class{' '}
                                    {assignment.classId}
                                </p>

                                <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.description || 'No description provided.'}</p>

                                <p className="text-xs text-gray-400 dark:text-gray-500">📅 Due: {assignment.dueDate}</p>
                            </CardContent>
                        </Card>

                        <form onSubmit={handleSubmit} className="space-y-8 px-1">
                            <div>
                                <Label htmlFor="response">Your Answer</Label>
                                <Textarea
                                    id="response"
                                    rows={6}
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    placeholder="Write your answer here..."
                                    className="mt-1 resize-none"
                                />
                                {errors.response && <p className="mt-1 text-sm text-red-500">{errors.response}</p>}
                            </div>

                            <div>
                                <Label htmlFor="attachment">Attachment (optional)</Label>
                                <Input id="attachment" type="file" onChange={(e) => setAttachment(e.target.files?.[0] || null)} className="mt-1" />
                                {errors.attachment && <p className="mt-1 text-sm text-red-500">{errors.attachment}</p>}
                            </div>

                            <Button type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Assignment'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
}

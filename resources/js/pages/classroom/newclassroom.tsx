import NewClassroomContent from '@/components/app/classroom/newclassroomContent';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

type Props = {
    role: string;
};

interface PageProps {
    auth: {
        user: UserModel;
    };
    users: UserModel[];
    [key: string]: any;
}

export default function NewClassroom({ role }: Props) {
    const { auth, users } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        id: '',
        name: '',
        course_id: '',
        teacher_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/classrooms', {
            onSuccess: () => {
                toast.success('Classroom created successfully!');
            },
            onError: () => {
                toast.error('Failed to create classroom. Please check the form.');
            },
        });
    };

    return (
        <>
            <ContentLayout user={auth.user}>
                <NewClassroomContent role={auth.user.role} />
            </ContentLayout>
        </>
    );
}

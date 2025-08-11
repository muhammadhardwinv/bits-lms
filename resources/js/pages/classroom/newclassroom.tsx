import NewClassroomContent from '@/components/app/classroom/newclassroomContent';
import { ContentLayout } from '@/layouts/content-layout';
import { ClassroomType, UserModel } from '@/lib/types';
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
    allClassroom: ClassroomType[];
    [key: string]: any;
}

export default function NewClassroom({ role }: Props) {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        course_id: '',
        teacher_id: auth.user.id || '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.classroom.store'), {
            onSuccess: () => {
                toast.success('Classroom created!');
                setData({ name: '', course_id: '', teacher_id: auth.user.id || '' });
            },
        });
    }

    return (
        <ContentLayout user={auth.user}>
            <NewClassroomContent role={auth.user.role} data={data} setData={setData} errors={errors} processing={processing} submit={submit} />
        </ContentLayout>
    );
}

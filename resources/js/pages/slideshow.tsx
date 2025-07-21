import SlideshowContent from '@/components/app/course/slideshow-content';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';

import { Head, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: UserModel;
    };
    courseId: string;
    [key: string]: any;
}

export default function Slideshow() {
    const { auth, courseId } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Slideshow">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout user={auth.user}>
                <SlideshowContent />
            </ContentLayout>
        </>
    );
}

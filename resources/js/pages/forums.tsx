import ForumsContent from '@/components/forums-contents';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function Forums() {
    return (
        <>
            <Head title="Forums">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <ForumsContent />
            </ContentLayout>
        </>
    );
}

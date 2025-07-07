import SlideshowContent from '@/components/app/course/slideshow-content';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function Slideshow() {
    return (
        <>
            <Head title="Slideshow">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <SlideshowContent />
            </ContentLayout>
        </>
    );
}

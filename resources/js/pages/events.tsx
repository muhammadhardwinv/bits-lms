import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function Events() {
    return (
        <ContentLayout>
            <Head title="Events" />
            <div>
                <h3 className="text-center text-lg font-bold">Events</h3>
                <div className="py-10"></div>
            </div>
        </ContentLayout>
    );
}

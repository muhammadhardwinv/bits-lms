import EventBackground from '@/components/app/events/events-content';
import EventNavbar from '@/components/app/events/events-navbar';
import { Head } from '@inertiajs/react';

export default function Events() {
    return (
        <>
            <Head title="Events" />
            <div>
                <EventBackground />
                <EventNavbar />
            </div>
        </>
    );
}

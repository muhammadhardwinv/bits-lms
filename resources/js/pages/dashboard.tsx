import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { LowerAreaInteractive } from '@/components/lower-area-interactive';
import ContentLayout from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [user, setUser] = useState<UserModel>({
        name: 'Chris',
        // role: 'lecturer',
        role: 'student',
    });
    return (
        <>
            <Head title="Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <ChartAreaInteractive user={user} />
                <LowerAreaInteractive />
            </ContentLayout>
        </>
    );
}

import { ChartAreaInteractive } from '@/components/app/dashboard/chart-area-interactive';
import { LowerAreaInteractive } from '@/components/app/dashboard/lower-area-interactive';
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
            <Head title="Dashboard" />
            <ContentLayout>
                <div className="mt-6">
                    <ChartAreaInteractive user={user} />
                </div>
                <LowerAreaInteractive />
            </ContentLayout>
        </>
    );
}

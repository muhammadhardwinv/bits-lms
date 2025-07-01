import MathematicsContent from '@/components/mathematicsContent';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';
import { UserModel } from '@/lib/types';
import { useState } from 'react';

export default function Mathematics() {
    const [user, setUser] = useState<UserModel>({
        name: 'Beckham',
        role: 'lecturer',
        // role: 'student',
    });

    return (
        <>
            <Head title="Mathematics">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <MathematicsContent user={user} />
            </ContentLayout>
        </>
    );
}

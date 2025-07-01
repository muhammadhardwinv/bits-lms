import ForumsContent from '@/components/forums-contents';
import ContentLayout from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { BookIcon } from 'lucide-react';
import { useState } from 'react';

export default function Forums() {
    const [user, setUser] = useState<UserModel>({
        name: 'Chris',
        role: 'lecturer',
    });
    return (
        <>
            <Head title="Forums">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <ForumsContent
                    title="Forum List"
                    icon={BookIcon}
                    items={['Mathematics', 'Physics', 'Chemistry', 'History', 'English Literature', 'Mandarin Literature']}
                    user={user}
                />
            </ContentLayout>
        </>
    );
}

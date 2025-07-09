'use client';

import LecturerSelectPageContent from '@/components/app/lecturerPage/lecturer-selectPage';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';

export default function LecturerSelectPage() {
    return (
        <ContentLayout>
            <Head title="Select Page - Lecturer" />
            <LecturerSelectPageContent />
        </ContentLayout>
    );
}

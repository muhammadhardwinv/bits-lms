import { BaseDiscussionContent } from '@/components/app/discussion/baseDiscussion-content';
import ContentLayout from '@/layouts/content-layout';

export default function BaseDiscussion() {
    return (
        <>
            <ContentLayout>
                <BaseDiscussionContent />
            </ContentLayout>
        </>
    );
}

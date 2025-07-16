import DiscussionContent from '@/components/app/discussion/discussion-content';
import ContentLayout from '@/layouts/content-layout';

export default function BaseDiscussion() {
    return (
        <>
            <ContentLayout>
                <DiscussionContent courseId="SCI-4321" />
            </ContentLayout>
        </>
    );
}

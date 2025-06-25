import { ChartAreaInteractive } from '@/components/app/sidebar/chart-area-interactive';
import { LowerAreaInteractive } from '@/components/app/sidebar/lower-area-interactive';
import ContentLayout from '@/layouts/content-layout';

export default function Dashboard() {
    return (
        <ContentLayout>
            <ChartAreaInteractive />
            <LowerAreaInteractive />
        </ContentLayout>
    );
}

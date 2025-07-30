import { Alert, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function SuccessAlert() {
    return (
        <>
            <Alert className="text-black">
                <Terminal />
                <AlertTitle>Successfully created course.</AlertTitle>
            </Alert>
        </>
    );
}

export function FailAlert() {
    return (
        <>
            <Alert className="text-black">
                <Terminal />
                <AlertTitle>Failed created course. Issue: Incorrect format</AlertTitle>
            </Alert>
        </>
    );
}

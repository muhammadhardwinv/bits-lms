import { router } from '@inertiajs/react';
import { ArrowUpCircle, Home } from 'lucide-react';

export default function DualNavButtons() {
    const jumpHome = () => {
        router.visit('/dashboard', {
            onSuccess: () => {
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            },
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Scroll on window');
    };

    return (
        <div className="fixed right-6 bottom-6 z-50 flex space-x-3">
            <button
                type="button"
                onClick={scrollToTop}
                className="rounded-full bg-white/30 p-3 shadow-md backdrop-blur-sm transition duration-300 hover:bg-white/50"
                aria-label="Back to Top"
            >
                <ArrowUpCircle className="h-6 w-6 text-black" />
            </button>
            <button
                type="button"
                onClick={jumpHome}
                className="rounded-full bg-white/30 p-3 shadow-md backdrop-blur-sm transition duration-300 hover:bg-white/50"
                aria-label="Back to Home"
            >
                <Home className="h-6 w-6 text-black" />
            </button>
        </div>
    );
}

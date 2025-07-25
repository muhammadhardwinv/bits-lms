import { router } from '@inertiajs/react';
import { ArrowUpCircle, Home } from 'lucide-react';

export default function DualNavButtons() {
    const jumpHome = () => {
        if (window.location.pathname === '/dashboard') {
            scrollToTop();
        } else {
            router.visit('/dashboard', {
                preserveScroll: false,
                preserveState: false,
                onSuccess: () => {
                    requestAnimationFrame(() => scrollToTop());
                },
            });
        }
    };

    const scrollToTop = () => {
        const el = document.getElementById('main-scroll');

        if (el) {
            try {
                el.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('Smooth scroll to top on #main-scroll');
            } catch (err) {
                el.scrollTop = 0;
                console.log('Fallback: immediate scroll to top on #main-scroll');
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('Fallback: scroll to top on window');
        }
    };

    return (
        <div className="fixed top-6 left-6 z-50 flex space-x-3">
            <button
                type="button"
                onClick={scrollToTop}
                className="rounded-full bg-white/30 p-3 shadow-md backdrop-blur-sm transition duration-300 hover:bg-white/50 focus:ring focus:ring-white/40 focus:outline-none"
                aria-label="Back to Top"
            >
                <ArrowUpCircle className="h-6 w-6 text-black dark:text-white" />
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

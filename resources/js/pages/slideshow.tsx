import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Slideshow() {
    const { courseId, classrooms } = usePage<{
        courseId: string;
        classrooms: any[];
    }>().props;

    const slides: any[] = [];
    classrooms.forEach((c) => {
        slides.push({ type: 'teacher', data: c.teacher });
        c.sessions.forEach((s: any) => slides.push({ type: 'session', data: s }));
        c.assignments?.forEach((a: any) => slides.push({ type: 'assignment', data: a }));
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [slides]);

    if (slides.length === 0) return <p>No slideshow data available.</p>;

    const slide = slides[currentIndex];

    return (
        <div className="relative mx-auto w-full max-w-2xl rounded-xl bg-gray-50 p-6 shadow">
            {slide.type === 'teacher' && (
                <div className="text-center">
                    <h2 className="text-xl font-bold">Instructor</h2>
                    <p className="text-lg">{slide.data.name}</p>
                    <p className="text-gray-500">{slide.data.email}</p>
                </div>
            )}
            {slide.type === 'session' && (
                <div className="text-center">
                    <h2 className="text-xl font-bold">Session</h2>
                    <p className="text-lg">{slide.data.title}</p>
                    <p className="text-gray-500">{slide.data.schedule_date}</p>
                </div>
            )}
            {slide.type === 'assignment' && (
                <div className="text-center">
                    <h2 className="text-xl font-bold">Assignment</h2>
                    <p className="text-lg">{slide.data.title}</p>
                    <p className="text-gray-500">Due: {slide.data.due_date}</p>
                </div>
            )}

            {/* Nav */}
            <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 shadow"
            >
                ◀
            </button>
            <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 shadow"
            >
                ▶
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, idx) => (
                    <div key={idx} className={`h-2 w-2 rounded-full ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-400'}`} />
                ))}
            </div>
        </div>
    );
}

import { ForumContentType, forumContents } from '@/lib/forumContent';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';

const slidePages = Array.from({ length: 18 }, (_, i) => `/assets/slides/${i + 1}.png`);

export default function SlideshowContent() {
    const { props } = usePage();
    const courseId = props.course as string;
    const courseData = forumContents.find((course: ForumContentType) => course.courseId === courseId);

    if (!courseData) {
        return <div className="text-center text-red-500">Course not found</div>;
    }

    const [currentSlide, setCurrentSlide] = useState(0);
    const [nowAutoplay, setAutoplay] = useState(false);

    useEffect(() => {
        if (!nowAutoplay) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidePages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [nowAutoplay]);

    const jumpToPage = (index: number) => {
        if (index >= 0 && index < slidePages.length) setCurrentSlide(index);
    };

    return (
        <div className="w-full space-y-8">
            <div className="mx-auto mb-6 flex w-full flex-col items-center gap-8 px-4 lg:px-6">
                {/* --- Combined Title and Info Block --- */}
                <div className="flex w-full flex-row items-center justify-center gap-6 text-center">
                    <div className="flex flex-col items-center space-y-1">
                        <h1 className="text-xl font-bold">{courseData.forumTitle}</h1>
                        <p className="text-md text-gray-600">
                            {courseData.courseName}, {courseData.courseId}
                        </p>
                    </div>

                    {/* Vertical separator */}
                    <div className="mx-4 h-12 w-px bg-gray-200" />

                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-md font-semibold">{courseData.lecturerName}</p>
                        <p className="text-sm text-gray-500">{courseData.lecturerId}</p>
                    </div>
                </div>

                {/* --- Slide Image Display --- */}
                <Card className="h-full max-h-[95vh] w-full max-w-[90vw] overflow-hidden rounded-2xl shadow-xl">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-center">
                            <img
                                src={slidePages[currentSlide]}
                                alt={`Slide ${currentSlide + 1}`}
                                className="max-h-[70vh] w-full rounded-xl object-contain"
                            />
                        </div>
                        <p className="mt-4 text-center text-gray-600">
                            Slide {currentSlide + 1} of {slidePages.length}
                        </p>
                    </CardContent>
                </Card>

                {/* --- Control Buttons --- */}
                <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    <Button onClick={() => setCurrentSlide(0)} variant="secondary">
                        ⏮ First
                    </Button>
                    <Button onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))} variant="secondary">
                        ◀ Prev
                    </Button>
                    <Button onClick={() => setAutoplay((prev) => !prev)} variant="secondary">
                        {nowAutoplay ? '⏸ Pause' : '▶ Play'}
                    </Button>
                    <Button onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slidePages.length - 1))} variant="secondary">
                        Next ▶
                    </Button>
                    <Button onClick={() => setCurrentSlide(slidePages.length - 1)} variant="secondary">
                        Last ⏭
                    </Button>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const input = new FormData(e.currentTarget);
                            const value = Number(input.get('slide')) - 1;
                            jumpToPage(value);
                        }}
                        className="col-span-2 flex gap-2 md:col-span-2 lg:col-span-2"
                    >
                        <div className="flex flex-row items-center justify-center gap-2 p-2 text-center">
                            <Input type="number" name="slide" placeholder="Go to slide" min={1} max={slidePages.length} className="w-[15vw]" />
                            <Button type="submit" variant="default">
                                Go
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

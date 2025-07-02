'use client';

import { Card, CardContent } from '@/components/ui/card';
import ContentLayout from '@/layouts/content-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const slideImages = [
    '/slides/slide1.jpg',
    '/slides/slide2.jpg',
    '/slides/slide3.jpg',
    // Add more slides
];

function SlideViewer() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToPrevious = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const goToNext = () => {
        if (currentSlide < slideImages.length - 1) setCurrentSlide(currentSlide + 1);
    };

    return (
        <div className="mx-auto w-full max-w-3xl text-center">
            <img src={slideImages[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="w-full rounded shadow" />
            <div className="mt-4 flex justify-center gap-4">
                <button onClick={goToPrevious} disabled={currentSlide === 0} className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50">
                    Previous
                </button>
                <button
                    onClick={goToNext}
                    disabled={currentSlide === slideImages.length - 1}
                    className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
                Slide {currentSlide + 1} of {slideImages.length}
            </p>
        </div>
    );
}

export default function Slideshow() {
    return (
        <>
            <Head title="Slideshow">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout>
                <div className="space-y-8 p-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold">Mathematics</h1>
                        <p className="text-xl text-gray-600">MATH101</p>
                        <p className="mt-8 ml-16 text-lg font-semibold">Dr. John Doe</p>
                        <p className="text-md ml-16 text-gray-500">JD123</p>
                    </div>

                    <div className="grid grid-cols-6 gap-4 border-y py-6">
                        {[1, 2, 3, 4, 5, 6].map((session) => (
                            <button
                                key={session}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-6 text-sm font-medium text-gray-800 shadow-sm transition duration-200 hover:bg-gray-50 hover:shadow-md"
                            >
                                Session {session}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Left Section */}
                        <div className="flex-1 space-y-4">
                            <h2 className="text-xl font-semibold">Introduction to Mathematics</h2>
                            {/* 👉 Embedded Slideshow */}
                            <div className="flex flex-col gap-6 lg:flex-row">
                                <h4 className="text-md mb-2 font-semibold">[PPT] Introduction to Algebra</h4>
                                <SlideViewer />
                            </div>
                        </div>

                        {/* Right Card */}
                        <Card className="h-fit w-full shadow-lg lg:w-72">
                            <CardContent className="space-y-4 p-6">
                                <h3 className="text-lg font-semibold">Things to do in this session</h3>
                                <nav className="flex flex-col gap-2 text-blue-600">
                                    <a href="/courses/mathematics/slideshow" className="hover:underline">
                                        [PPT] Introduction to Algebra
                                    </a>
                                    <a href="/forums" className="hover:underline">
                                        Go to Forum Page
                                    </a>
                                    <a href="/courses/mathematics/quiz" className="hover:underline">
                                        Go to Quiz Page
                                    </a>
                                    <a href="/exam" className="hover:underline">
                                        Go to Exam Page
                                    </a>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ContentLayout>
        </>
    );
}

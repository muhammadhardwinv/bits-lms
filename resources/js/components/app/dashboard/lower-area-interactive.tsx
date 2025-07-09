'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { events } from '@/lib/events-lib/eventData';

export const description = 'An interactive area chart';
export function SliderBox() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const itemWidth = 200 + 16;
    const totalSlides = 10;

    const scrollToSlide = (index: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth',
            });
        }
    };

    const handleNext = () => {
        const next = Math.min(activeSlide + 1, totalSlides - 1);
        setActiveSlide(next);
        scrollToSlide(next);
    };

    const handlePrev = () => {
        const prev = Math.max(activeSlide - 1, 0);
        setActiveSlide(prev);
        scrollToSlide(prev);
    };

    return null;
}

export function LowerAreaInteractive() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const totalSlides = 10;

    React.useEffect(() => {
        const calculateWidth = () => {
            if (sliderRef.current) {
                setItemWidth(sliderRef.current.offsetWidth);
            }
        };
        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    const scrollToSlide = (index: number) => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="mx-auto mb-6 flex max-w-[95vw] flex-wrap justify-between gap-4 px-4 lg:px-6">
            {/* Left Chat Box */}
            <div className="h-[50vh] basis-[35%] overflow-y-auto rounded-lg border bg-muted/20 p-4">
                <div data-slot="card" className="flex h-full flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm">
                    <div data-slot="card-header" className="flex flex-row items-center px-6">
                        <div className="flex items-center gap-4">
                            <span data-slot="avatar" className="relative flex size-8 shrink-0 overflow-hidden rounded-full border">
                                <img src="/assets/logo-user.png" alt="" />
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <p className="leading-none font-medium text-indigo-500 dark:text-indigo-400">Michael</p>
                                <p className="text-xs text-muted-foreground">michael.main@ac.id</p>
                            </div>
                        </div>
                    </div>
                    <div data-slot="card-content" className="flex-1 overflow-y-auto px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                Hi, how can I help you today?
                            </div>
                            <div className="ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm text-primary-foreground">
                                Hey, I'm having trouble with my account.
                            </div>
                            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                What seems to be the problem?
                            </div>
                            <div className="ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm text-primary-foreground">
                                I can't log in.
                            </div>
                            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                Make sure you encounter correct email and password.
                            </div>
                        </div>
                    </div>
                    <div data-slot="card-footer" className="flex items-center px-6">
                        <form className="relative w-full">
                            <input
                                type="text"
                                id="message"
                                placeholder="Type your message..."
                                autoComplete="off"
                                className="flex h-9 w-full rounded-md border border-input bg-white px-3 pr-10 text-base text-gray-900 shadow-xs transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-2 size-6 -translate-y-1/2 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-500"
                            >
                                <span className="text-md text-white">+</span>
                                <span className="sr-only">Send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Slider Box */}
            <div className="h-[50vh] basis-[63.5%] overflow-hidden rounded-lg border bg-muted/20 p-3">
                <a
                    href="#"
                    className="text-md mt-4 mb-4 block text-center font-semibold text-indigo-500 tabular-nums @[250px]/card:text-3xl dark:text-indigo-400"
                >
                    Upcoming Events
                </a>
                <div className="relative h-[40vh]">
                    <button
                        onClick={() => {
                            const newSlide = Math.max(currentSlide - 1, 0);
                            setCurrentSlide(newSlide);
                            scrollToSlide(newSlide);
                        }}
                        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-muted p-2 shadow hover:bg-muted/70"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={() => {
                            const newSlide = Math.min(currentSlide + 1, totalSlides - 1);
                            setCurrentSlide(newSlide);
                            scrollToSlide(newSlide);
                        }}
                        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-muted p-2 shadow hover:bg-muted/70"
                    >
                        <ArrowRight />
                    </button>
                    <div ref={sliderRef} className="flex h-full w-full overflow-x-hidden scroll-smooth">
                        {events.map((event, index) => (
                            <div key={index} className="h-full w-full shrink-0">
                                <Card className="h-full w-full">
                                    <CardContent className="flex h-full items-center justify-center p-6">
                                        <div className="group relative h-64 w-full overflow-hidden rounded-xl shadow-md">
                                            <img
                                                src={event.imageUrls[0]}
                                                alt={`Event ${index + 1}`}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="bg-opacity-90 absolute inset-0 flex flex-col justify-end bg-black p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                                                <p className="mb-1 text-sm font-bold text-white">{event.description}</p>
                                                <br />
                                                <p className="text-sm text-white">
                                                    <strong>Date:</strong> {event.date}
                                                </p>
                                                <p className="text-sm text-white">
                                                    <strong>Location:</strong> {event.location}
                                                </p>
                                                <br />
                                                <p className="text-sm text-white">
                                                    <strong>Speaker:</strong> {event.featuredSpeaker}
                                                </p>
                                                <p className="text-sm text-white">
                                                    <strong>Topics:</strong> {event.topics.join(', ')}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

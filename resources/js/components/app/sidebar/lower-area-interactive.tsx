'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';

export const description = 'An interactive area chart';

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} className="flex-1 rounded-md border shadow-sm" captionLayout="dropdown" />;
}
export function LowerAreaInteractive() {
    const sliderRef = React.useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const direction = e.deltaY > 0 ? 'down' : 'up';
        console.log('Scroll direction:', direction);
    };

    return (
        <div className="grid grid-cols-12 gap-6 px-1 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:flex-wrap lg:px-6 dark:*:data-[slot=card]:bg-card">
            {/* Box 3 (Left) */}
            <div className="col-span-4 h-[50vh] overflow-y-auto rounded-lg border bg-muted/20 p-1">
                <div data-slot="card" className="flex h-full flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm">
                    {/* Header */}
                    <div data-slot="card-header" className="flex flex-row items-center px-6">
                        <div className="flex items-center gap-4">
                            <span data-slot="avatar" className="relative flex size-8 shrink-0 overflow-hidden rounded-full border">
                                <img src="assets/logo-user.png" alt="" />
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-sm leading-none font-medium">Chris</p>
                                <p className="text-xs text-muted-foreground">chris@g.c</p>
                            </div>
                        </div>
                        <button
                            className="ml-auto size-8 rounded-full bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80"
                            type="button"
                        >
                            <a href="#" className="text-2xl">
                                +
                            </a>
                            <span className="sr-only">New message</span>
                        </button>
                    </div>

                    {/* Chat Content */}
                    <div data-slot="card-content" className="flex-1 overflow-y-auto px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                Hi, how can I help you today?
                            </div>
                            <div className="ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                                Hey, I'm having trouble with my account.
                            </div>
                            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                What seems to be the problem?
                            </div>
                            <div className="ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                                I can't log in.
                            </div>
                        </div>
                    </div>

                    {/* Footer / Input */}
                    <div data-slot="card-footer" className="flex items-center px-6">
                        <form className="relative w-full">
                            <input
                                type="text"
                                id="message"
                                placeholder="Type your message..."
                                autoComplete="off"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 pr-10 text-base shadow-xs transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-2 size-6 -translate-y-1/2 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                            >
                                <a href="#" type="submit text-2xl">
                                    +
                                </a>
                                <span className="sr-only">Send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-span-8 h-[50vh] overflow-hidden rounded-lg border bg-muted/20 p-2">
                <a href="" className="text-md mt-4 mb-4 block text-center font-semibold tabular-nums @[250px]/card:text-3xl">
                    Upcoming Events
                </a>
                <div
                    className="flex h-full space-x-4 overflow-x-auto p-2 whitespace-nowrap"
                    ref={sliderRef}
                    onWheel={(e) => {
                        if (sliderRef.current) {
                            sliderRef.current.scrollLeft += e.deltaY;
                            e.preventDefault();
                        }
                    }}
                >
                    <div className="shrink-0"></div>

                    {Array.from({ length: 30 }).map((_, index) => (
                        <div key={index} className="w-[200px] shrink-0">
                            <Card>
                                <CardContent className="ml-2 flex h-[32vh] items-center justify-start p-6">
                                    <span className="text-md font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

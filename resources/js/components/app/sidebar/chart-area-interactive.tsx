'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';

export const description = 'An interactive area chart';

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="h-[60vh] flex-1 rounded-md border shadow-sm"
            // className="rounded-mg flex-1 border shadow-sm"
            captionLayout="dropdown"
        />
    );
}

export function ChartAreaInteractive() {
    const sliderRef = React.useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const direction = e.deltaY > 0 ? 'down' : 'up';
        console.log('Scroll direction:', direction);
        // Optional: React to scroll direction
        // Example: trigger animation, load more, etc.
    };

    return (
        <div className="mb-6 flex items-center justify-center gap-6 px-1 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:flex-wrap lg:px-6 dark:*:data-[slot=card]:bg-card">
            <div className="col-span-1 h-[60vh] max-w-[32vw] flex-1 overflow-y-auto rounded-lg border bg-muted/20 p-1 @5xl/main:col-span-1">
                <div className="flex justify-center py-2">
                    <a href="" className="text-md mt-2 mb-2 text-center font-semibold tabular-nums @[250px]/card:text-3xl">
                        Recent Activity
                    </a>
                </div>

                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="pt-1">
                        <div className="p-1">
                            <Card>
                                <CardContent className="ml-2 flex items-center justify-start p-6">
                                    <span className="text-md font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-span-1 h-[60vh] max-w-[32vw] flex-1 overflow-y-auto rounded-lg border bg-muted/20 p-1 @5xl/main:col-span-1">
                <div className="flex justify-center py-2">
                    <a href="" className="text-md mt-2 mb-2 text-center font-semibold tabular-nums @[250px]/card:text-3xl">
                        Assignment
                    </a>
                </div>

                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="pt-1">
                        <div className="p-1">
                            <Card>
                                <CardContent className="ml-2 flex items-center justify-start p-6">
                                    <span className="text-md font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>

            <CalendarDemo />
        </div>
    );
}

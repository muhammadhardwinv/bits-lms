import { Calendar } from '@/components/ui/calendar';
import React from 'react';

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
        <div className="flex h-full w-full max-w-[23vw] flex-col overflow-hidden rounded-lg border bg-gradient-to-br from-indigo-100 to-purple-100 p-1 shadow-md dark:border-gray-700 dark:from-[#121212] dark:to-[#1f1f1f]">
            <div className="flex-1 rounded-md bg-white p-2 dark:bg-[#181818]">
                <div className="items-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="h-[54vh] w-full origin-top scale-[1] transform text-[13px] leading-tight text-gray-900 dark:bg-[#181818] dark:text-gray-100"
                        captionLayout="dropdown"
                    />
                </div>

                <div className="rounded-md border bg-white text-center shadow-sm dark:border-gray-700 dark:bg-[#181818]">
                    <h4 className="text-sm text-gray-800 dark:text-gray-100">Current Date: {date?.toDateString()}</h4>
                </div>
            </div>
        </div>
    );
}

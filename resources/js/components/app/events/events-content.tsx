import { events } from '@/lib/events-lib/eventData';
import { news } from '@/lib/events-lib/newsData';
import DualNavButtons from './events-navbar';

export default function EventBackground() {
    const section1 = events[0];
    const section2 = news[0];

    return (
        <div>
            <DualNavButtons />
            <div className="min-h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
                <section className="flex h-screen w-screen snap-start flex-col items-center bg-black text-white">
                    <h1 className="my-8 items-center py-4 text-center text-4xl font-black">
                        BITS Innovation Summit: <br />
                        Empowering the Future of Tech
                    </h1>
                    <div className="flex w-screen gap-4 overflow-x-auto px-4 py-2">
                        {events.flatMap((event, eventIndex) =>
                            event.imageUrls.map((url, imgIndex) => (
                                <div
                                    key={`${eventIndex}-${imgIndex}`}
                                    className="group relative h-124 w-206 flex-shrink-0 overflow-hidden rounded shadow-lg"
                                >
                                    <img src={url} alt={`event-${eventIndex}-img-${imgIndex}`} className="h-full w-full object-cover" />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex items-end bg-black/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                                        <div className="text-white">
                                            <h3 className="text-sm font-semibold">{event.description}</h3>
                                            <p className="text-xs">
                                                {event.date} — {event.location}
                                            </p>
                                            <br />
                                            {event.topics.map((topic, index) => (
                                                <p key={index} className="mx-1 my-1 inline-block gap-8 rounded-full bg-gray-400 px-1 py-1 text-xs">
                                                    {topic}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )),
                        )}
                    </div>
                </section>

                <section className="flex h-screen w-full snap-start flex-col items-start bg-black text-white">
                    <h1 className="my-8 ml-4 items-center py-4 text-center text-4xl font-black">Latest News:</h1>

                    <div className="flex w-full gap-4 overflow-x-auto px-4 py-2">
                        {news.flatMap((report, reportIndex) =>
                            report.imageUrls.map((url, imgIndex) => (
                                <div
                                    key={`${reportIndex}-${imgIndex}`}
                                    className="group relative h-124 w-206 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
                                >
                                    <img src={url} alt={`Image for event: ${report.description}`} className="h-full w-full object-cover" />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex items-end bg-black/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                                        <div className="text-white">
                                            <h3 className="line-clamp-2 text-sm font-semibold">{report.description}</h3>
                                            <p className="text-xs">
                                                {report.date} — {report.location}
                                            </p>

                                            {/* ✅ Topics Section */}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {report.topics.map((topic, index) => (
                                                    <p key={index} className="inline-block rounded-full bg-gray-400 px-2 py-1 text-xs text-black">
                                                        {topic}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )),
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

import { events } from '@/lib/events-lib/eventData';

export default function EventBackground() {
    return (
        <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
            {events.map(({ imageUrl, description, date, location, featuredSpeaker, topics }, i) => (
                <section
                    key={i}
                    className="group relative flex h-screen snap-start items-center justify-center bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    aria-label={description}
                    role="img"
                >
                    {/* Overlay */}
                    <div className="group-hover:backdrop-blur-0 absolute inset-0 z-10 bg-black/30 backdrop-blur-sm backdrop-invert backdrop-opacity-20 transition-all duration-500 group-hover:bg-transparent group-hover:backdrop-invert-0 group-hover:backdrop-opacity-0" />

                    {/* Content box */}
                    <div className="contentLayout bg-opacity-70 relative z-20 max-w-xl rounded bg-black/50 p-8 text-white backdrop-blur-sm dark:bg-black/50 dark:text-white dark:backdrop-blur-sm">
                        <h2 className="dark:text-whitefont-semibold mb-2 p-8 text-xl text-white drop-shadow-md">{description}</h2>

                        <p className="mb-1 text-sm">
                            {date} — {location}
                        </p>

                        <p className="mb-3 text-sm italic">Speaker: {featuredSpeaker}</p>

                        <div className="flex flex-wrap gap-2">
                            {topics.map((topic, idx) => (
                                <span key={idx} className="rounded bg-white/90 px-2 py-1 text-xs text-black dark:bg-white/20 dark:text-white">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}

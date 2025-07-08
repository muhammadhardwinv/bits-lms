export interface EventData {
    imageUrl: string;
    description: string;
    date: string;
    location: string;
    featuredSpeaker: string;
    topics: string[];
}

export const events: EventData[] = [
    {
        imageUrl: '/assets/events-assets/assets1.jpg',
        description: 'High-level panel discussion at the World Economic Forum with a roundtable format and a live audience.',
        date: '2025-01-15',
        location: 'Davos, Switzerland',
        featuredSpeaker: 'Klaus Schwab (Founder of WEF)',
        topics: ['Global Economy', 'Sustainability', 'Geopolitics'],
    },
    {
        imageUrl: '/assets/events-assets/assets2.jpg',
        description: 'A large-scale tech conference filled with thousands of attendees, featuring dynamic stage presentations.',
        date: '2025-09-12',
        location: 'Los Angeles Convention Center, CA',
        featuredSpeaker: 'Dr. Elaine Parker',
        topics: ['AI', 'Cybersecurity', 'Cloud Computing', 'Innovation'],
    },
    {
        imageUrl: '/assets/events-assets/assets3.jpg',
        description: 'Audience attentively watching a tech or innovation talk in a dark, atmospheric conference setting.',
        date: '2025-03-05',
        location: 'San Francisco, CA, USA',
        featuredSpeaker: 'Unknown (Audience View)',
        topics: ['Tech Innovation', 'AI Ethics', 'Startups'],
    },
    {
        imageUrl: '/assets/events-assets/assets4.jpg',
        description: 'A product-focused keynote presentation showcasing a mobile app interface to a tech-savvy audience.',
        date: '2025-10-03',
        location: 'Tech Warehouse Hub, Seattle, WA',
        featuredSpeaker: 'Jordan Reeves',
        topics: ['UI/UX Design', 'Product Management', 'Mobile Apps'],
    },
    {
        imageUrl: '/assets/events-assets/assets5.jpg',
        description: 'An intimate, expressive group discussion set in an art gallery environment, emphasizing creativity and dialogue.',
        date: '2025-11-18',
        location: 'Urban Art Gallery, Brooklyn, NY',
        featuredSpeaker: 'Samantha Cruz',
        topics: ['Creative Thinking', 'Community Engagement', 'Art & Design'],
    },
    {
        imageUrl: '/assets/events-assets/assets7.jpg',
        description: 'Academic or professional conference in a lecture hall, with the speaker engaging a large audience.',
        date: '2025-04-20',
        location: 'Singapore (University Hall)',
        featuredSpeaker: 'Dr. Tan Wei Ming (Moderator)',
        topics: ['Education', 'Research Collaboration', 'Higher Learning'],
    },
];

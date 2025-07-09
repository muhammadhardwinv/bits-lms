export interface NewsData {
    imageUrls: string[]; // array of image URLs
    description: string;
    date: string;
    location: string;
    featuredSpeaker: string;
    topics: string[];
}

export const news: NewsData[] = [
    {
        imageUrls: ['/assets/news-assets/ghost-nets-featured.jpg'],
        description:
            'Coastal fishing harbor with multiple traditional wooden fishing boats. Nets with plastic floats are visible, highlighting artisanal fishing methods.',
        date: '2025-06-15',
        location: 'Jamestown Fishing Port, Accra, Ghana',
        featuredSpeaker: 'Kwame Boateng (Local Fisheries Advocate)',
        topics: ['Artisanal Fisheries', 'Marine Conservation', 'Ghost Nets', 'Sustainable Livelihoods'],
    },
    {
        imageUrls: ['/assets/news-assets/Parkinsons-Brain-Scan.jpg'],
        description:
            'MRI brain scans showing cross-sectional images, likely highlighting neurological abnormalities associated with Parkinson’s Disease.',
        date: '2025-07-02',
        location: 'Neuroscience Research Lab, Berlin, Germany',
        featuredSpeaker: 'Dr. Ingrid Meyer',
        topics: ['Neurology', 'Parkinson’s Disease', 'Medical Imaging', 'Neurodegenerative Disorders'],
    },
    {
        imageUrls: ['/assets/news-assets/Sparse-Forests_Pic1.jpg'],
        description:
            'Serene mixed forest with sparse undergrowth and moss-covered tree trunks, indicative of a temperate deciduous forest recovering from seasonal changes.',
        date: '2025-05-10',
        location: 'Bavarian Forest National Park, Germany',
        featuredSpeaker: 'Dr. Lukas Reinhardt (Forest Ecologist)',
        topics: ['Forest Ecology', 'Climate Impact', 'Biodiversity', 'Reforestation'],
    },
    {
        imageUrls: ['/assets/news-assets/Undocumented-Orphaned-Wells.jpg'],
        description:
            'An oil pumpjack sits idle in a dry grassland overlaid with a topographic oil field map, symbolizing concerns around undocumented orphaned wells.',
        date: '2025-08-21',
        location: 'Kern County Oil Fields, California, USA',
        featuredSpeaker: 'Erika L. Gomez (Environmental Geologist)',
        topics: ['Energy Transition', 'Environmental Risk', 'Oil & Gas Policy', 'Orphaned Wells'],
    },
    {
        imageUrls: ['/assets/news-assets/scotland-hottest-days.jpg'],
        description:
            'Scotland experiences its warmest day on record, leading to widespread outdoor activities and discussions on climate change impacts in northern latitudes.',
        date: '2025-07-08',
        location: 'Scottish Highlands, Scotland',
        featuredSpeaker: 'Dr. Isla MacLeod (Climatologist)',
        topics: ['Climate Change', 'Extreme Weather', 'Environmental Impact', 'Tourism'],
    },
    {
        imageUrls: ['/assets/news-assets/Archaeologists-unveil-3,500-year-old_city_in_peru.jpg'],
        description:
            'Archaeologists in Peru unveil a remarkably preserved 3,500-year-old city, offering new insights into ancient Andean civilizations and their complex societal structures.',
        date: '2025-06-20',
        location: 'Supe Valley, Peru',
        featuredSpeaker: 'Professor Elena Ramirez (Archaeological Lead)',
        topics: ['Archaeology', 'Ancient Civilizations', 'Peruvian History', 'Cultural Heritage'],
    },
    {
        imageUrls: ['/assets/news-assets/chinese-emission-reduced.jpg'],
        description:
            'New data reveals a significant reduction in China’s carbon emissions, attributed to massive investments in renewable energy and green technologies across various industrial sectors.',
        date: '2025-07-05',
        location: 'Beijing, China',
        featuredSpeaker: 'Minister Li Wei (Environmental Protection Ministry)',
        topics: ['Climate Action', 'Renewable Energy', 'Emissions Reduction', 'Sustainable Development'],
    },
    {
        imageUrls: ['/assets/news-assets/wolf-howling-e1730224047800.jpg'],
        description:
            'Recent observations indicate changes in wolf pack habits linked to seasonal shifts, impacting migration patterns and hunting strategies across various North American territories.',
        date: '2025-06-28',
        location: 'Yellowstone National Park, USA',
        featuredSpeaker: 'Dr. Samuel "Wolf" Hunter (Wildlife Biologist)',
        topics: ['Wildlife', 'Ecology', 'Animal Behavior', 'Conservation'],
    },
    {
        imageUrls: ['/assets/news-assets/monai-1-4-featured.jpg'],
        description:
            'Breakthroughs in robotic anatomy analysis are revolutionizing medical diagnostics, offering unprecedented precision in mapping human internal structures for surgical planning and disease detection.',
        date: '2025-07-01',
        location: 'Stanford University Medical Center, USA',
        featuredSpeaker: 'Dr. Anya Sharma (Bio-Robotics Engineer)',
        topics: ['Medical Technology', 'Robotics', 'Anatomy', 'Healthcare Innovation'],
    },
];

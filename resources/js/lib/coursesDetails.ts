// types/courseDetails.ts

const course_mappings = [
    ['SCI-4321', 'Science'],
    ['BIO-2201', 'Biology'],
    ['GEO-3010', 'Geography'],
    ['CHEM-1103', 'Chemistry'],
    ['BIO-3302', 'Biology'],
    ['PHY-2502', 'Physics'],
    ['PHY-1205', 'Physics'],
    ['GEO-2222', 'Geography'],
    ['SCI-5533', 'Science'],
    ['CHEM-1211', 'Chemistry'],
    ['BIO-4120', 'Biology'],
    ['SCI-2098', 'Science'],
    ['BIO-1015', 'Biology'],
    ['GEO-8787', 'Geography'],
    ['CHEM-2920', 'Chemistry'],
    ['PHY-1205', 'Physics'],
];

export type CourseType = {
    title: string;
    courseName: string;
    courseId: string;
    classId: string;
    dueDate: string;
    type: 'Essay' | 'Written Report' | 'Short Answer' | 'True/False' | 'Fill in the Blank';
    description: string;
    link: string;
};
export const cls = [
    'XII-Science-1',
    'XI-Biology-2',
    'X-Geography-1',
    'X-Chem-1',
    'XI-Biology-3',
    'XI-Physics-2',
    'X-Geography-2',
    'X-Physics-1',
    'XI-Science-2',
    'XI-Chem-1',
    'X-Biology-3',
    'XII-Science-2',
    'X-Biology-1',
    'XI-Geography-1',
    'XII-Chem-2',
] as const;

export const courses: CourseType[] = [
    {
        title: 'Environmental Impact of Chemical Waste',
        courseName: 'Science',
        courseId: 'SCI-4321',
        classId: 'XII-Science-1',
        dueDate: '2025-07-10',
        type: 'Written Report',
        description:
            'Prepare a comprehensive report analyzing how improper disposal of industrial and household chemical waste affects terrestrial and aquatic ecosystems. Your report should include scientific data, case studies of major chemical spills, and a comparison between developed and developing countries in terms of chemical regulation enforcement. Conclude by suggesting actionable steps to minimize environmental risks.',
        link: '/assignment/science/SCI-4321',
    },
    {
        title: 'Photosynthesis Process Essay',
        courseName: 'Biology',
        courseId: 'BIO-2201',
        classId: 'XI-Biology-2',
        dueDate: '2025-07-08',
        type: 'Essay',
        description:
            'Write a detailed essay explaining each stage of the photosynthesis process, including light-dependent and light-independent reactions. Discuss the role of chlorophyll, the impact of environmental factors such as light intensity and carbon dioxide concentration, and the importance of photosynthesis in the global carbon cycle. Include real data from experiments conducted in controlled environments.',
        link: '/assignment/biology/BIO-2201',
    },
    {
        title: 'The Greenhouse Effect',
        courseName: 'Geography',
        courseId: 'GEO-3010',
        classId: 'X-Geography-1',
        dueDate: '2025-07-12',
        type: 'Short Answer',
        description:
            'Answer a series of short questions explaining the scientific mechanisms behind the greenhouse effect. Use diagrams to support your answers and provide examples of natural and human-induced greenhouse gases. Describe how this phenomenon contributes to climate change and discuss potential mitigation strategies implemented by governments worldwide.',
        link: '/assignment/geography/GEO-3010',
    },
    {
        title: 'Periodic Table Properties',
        courseName: 'Chemistry',
        courseId: 'CHEM-1103',
        classId: 'X-Chem-1',
        dueDate: '2025-07-13',
        type: 'Fill in the Blank',
        description:
            'Complete sentences and charts based on the periodic table, focusing on atomic number, electronegativity, ionization energy, and reactivity trends. You will be tested on your ability to predict element properties using group and period positions, and relate these to real-world applications such as corrosion resistance and conductivity.',
        link: '/assignment/chemistry/CHEM-1103',
    },
    {
        title: 'Cell Division Mechanisms',
        courseName: 'Biology',
        courseId: 'BIO-3302',
        classId: 'XI-Biology-3',
        dueDate: '2025-07-15',
        type: 'Essay',
        description:
            'Write an essay comparing the processes of mitosis and meiosis, including all their phases and regulatory mechanisms. Discuss the biological significance of each process in growth, repair, and reproduction. Use illustrations to depict chromosome behavior and explain genetic variation resulting from meiosis.',
        link: '/assignment/biology/BIO-3302',
    },
    {
        title: 'Electric Circuits Explanation',
        courseName: 'Physics',
        courseId: 'PHY-2502',
        classId: 'XI-Physics-2',
        dueDate: '2025-07-11',
        type: 'Short Answer',
        description:
            'Provide short explanations for a set of questions related to electric circuits. Topics include Ohm’s Law, resistors in series and parallel, voltage division, and current calculations. Include at least one real-life application where each type of circuit configuration is commonly used.',
        link: '/assignment/physics/PHY-2502',
    },
    {
        title: 'Volcano Formation Report',
        courseName: 'Geography',
        courseId: 'GEO-2222',
        classId: 'X-Geography-2',
        dueDate: '2025-07-16',
        type: 'Written Report',
        description:
            'Compose a detailed report about the geological processes behind the formation of volcanoes. Include different types of volcanoes, how tectonic activity contributes to their formation, and the global distribution of major volcanic zones. Use recent case studies and include diagrams or maps for visual explanation.',
        link: '/assignment/geography/GEO-2222',
    },
    {
        title: 'Motion and Acceleration',
        courseName: 'Physics',
        courseId: 'PHY-1205',
        classId: 'X-Physics-1',
        dueDate: '2025-07-09',
        type: 'True/False',
        description:
            'Read the following statements about uniform motion, acceleration, and Newton’s laws. Mark them as True or False, and provide a 1-2 sentence explanation justifying your answer. This will test both conceptual understanding and ability to apply formulas in motion-related scenarios.',
        link: '/assignment/physics/PHY-1205',
    },
    {
        title: 'Global Warming Effects',
        courseName: 'Science',
        courseId: 'SCI-5533',
        classId: 'XI-Science-2',
        dueDate: '2025-07-14',
        type: 'Essay',
        description:
            'Write an essay exploring the causes and consequences of global warming, focusing particularly on its impact on polar ecosystems, sea ice, ocean currents, and biodiversity. Incorporate recent climate data, satellite imagery references, and discuss what international bodies like the IPCC are doing to address the issue.',
        link: '/assignment/science/SCI-5533',
    },
    {
        title: 'Acid and Base Reaction Types',
        courseName: 'Chemistry',
        courseId: 'CHEM-1211',
        classId: 'XI-Chem-1',
        dueDate: '2025-07-18',
        type: 'Short Answer',
        description:
            'Answer structured questions that require explaining acid-base theories, identifying types of acid-base reactions, and writing balanced chemical equations. You should also describe practical laboratory uses and everyday examples of acid and base reactions.',
        link: '/assignment/chemistry/CHEM-1211',
    },
    {
        title: 'Plant Classification Chart',
        courseName: 'Biology',
        courseId: 'BIO-4120',
        classId: 'X-Biology-3',
        dueDate: '2025-07-19',
        type: 'Fill in the Blank',
        description:
            'Complete a detailed classification chart of plants based on key characteristics like vascular tissue presence, seed formation, flower production, and reproduction methods. The goal is to show your understanding of taxonomy and evolutionary relationships within the plant kingdom.',
        link: '/assignment/biology/BIO-4120',
    },
    {
        title: 'Renewable Energy Sources',
        courseName: 'Science',
        courseId: 'SCI-2098',
        classId: 'XII-Science-2',
        dueDate: '2025-07-20',
        type: 'Written Report',
        description:
            'Research and write a report on various types of renewable energy sources, such as solar, wind, hydro, and geothermal. Discuss how they work, their advantages and limitations, and include statistics on their global usage and economic viability. Use government and scientific reports as references.',
        link: '/assignment/science/SCI-2098',
    },
    {
        title: 'Human Skeletal System Essay',
        courseName: 'Biology',
        courseId: 'BIO-1015',
        classId: 'X-Biology-1',
        dueDate: '2025-07-21',
        type: 'Essay',
        description:
            'Describe in detail the structure and function of the human skeletal system. Include information on bone classification, joint types, common skeletal diseases, and how the skeleton interacts with muscular and nervous systems. Use labeled diagrams to support your explanations.',
        link: '/assignment/biology/BIO-1015',
    },
    {
        title: 'Tectonic Plate Boundaries',
        courseName: 'Geography',
        courseId: 'GEO-8787',
        classId: 'XI-Geography-1',
        dueDate: '2025-07-22',
        type: 'Short Answer',
        description:
            'Answer questions identifying different types of tectonic boundaries—convergent, divergent, and transform. Describe what geological events are typically associated with each and cite real-world examples such as the Ring of Fire or the San Andreas Fault.',
        link: '/assignment/geography/GEO-8787',
    },
    {
        title: 'Chemical Bonding',
        courseName: 'Chemistry',
        courseId: 'CHEM-2920',
        classId: 'XII-Chem-2',
        dueDate: '2025-07-23',
        type: 'True/False',
        description:
            'Evaluate statements about ionic, covalent, and metallic bonding. Indicate if each is True or False and give reasoning for your answer. Diagrams and electron-dot structures may be required to support your justification.',
        link: '/assignment/chemistry/CHEM-2920',
    },
];

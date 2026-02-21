// Mock API service for NASA and ISRO satellite data
// In production, replace with actual API endpoints

// Simulated satellite data for each planet
const satelliteData = {
    mercury: {
        total: 2,
        nasa: 1,
        isro: 0,
        other: 1,
        missions: [
            { name: 'MESSENGER', agency: 'NASA', status: 'Completed', year: 2015 },
            { name: 'BepiColombo', agency: 'ESA/JAXA', status: 'En Route', year: 2025 },
        ],
    },
    venus: {
        total: 3,
        nasa: 1,
        isro: 1,
        other: 1,
        missions: [
            { name: 'Akatsuki', agency: 'JAXA', status: 'Active', year: 2015 },
            { name: 'Shukrayaan-1', agency: 'ISRO', status: 'Planned', year: 2028 },
            { name: 'VERITAS', agency: 'NASA', status: 'Planned', year: 2031 },
        ],
    },
    earth: {
        total: 8234,
        nasa: 3891,
        isro: 54,
        other: 4289,
        missions: [
            { name: 'ISS', agency: 'International', status: 'Active', year: 1998 },
            { name: 'Hubble', agency: 'NASA', status: 'Active', year: 1990 },
        ],
    },
    mars: {
        total: 8,
        nasa: 5,
        isro: 1,
        other: 2,
        missions: [
            { name: 'Mars Orbiter Mission (Mangalyaan)', agency: 'ISRO', status: 'Active', year: 2014 },
            { name: 'Perseverance Rover', agency: 'NASA', status: 'Active', year: 2021 },
            { name: 'Curiosity Rover', agency: 'NASA', status: 'Active', year: 2012 },
            { name: 'Mars Reconnaissance Orbiter', agency: 'NASA', status: 'Active', year: 2006 },
            { name: 'MAVEN', agency: 'NASA', status: 'Active', year: 2014 },
            { name: 'Mars Express', agency: 'ESA', status: 'Active', year: 2003 },
            { name: 'Tianwen-1', agency: 'CNSA', status: 'Active', year: 2021 },
        ],
    },
    jupiter: {
        total: 2,
        nasa: 2,
        isro: 0,
        other: 0,
        missions: [
            { name: 'Juno', agency: 'NASA', status: 'Active', year: 2016 },
            { name: 'Europa Clipper', agency: 'NASA', status: 'Planned', year: 2030 },
        ],
    },
    saturn: {
        total: 1,
        nasa: 1,
        isro: 0,
        other: 0,
        missions: [
            { name: 'Cassini', agency: 'NASA', status: 'Completed', year: 2017 },
        ],
    },
    uranus: {
        total: 0,
        nasa: 0,
        isro: 0,
        other: 0,
        missions: [],
    },
    neptune: {
        total: 0,
        nasa: 0,
        isro: 0,
        other: 0,
        missions: [],
    },
};

// Mock mission news data
const missionNews = [
    {
        id: 1,
        title: 'ISRO\'s Chandrayaan-3 Successfully Lands on Moon\'s South Pole',
        agency: 'ISRO',
        date: '2023-08-23',
        description: 'Historic achievement as India becomes fourth nation to land on the Moon.',
    },
    {
        id: 2,
        title: 'Aditya-L1 Reaches Sun-Earth L1 Point',
        agency: 'ISRO',
        date: '2024-01-06',
        description: 'India\'s first solar observatory successfully positioned at Lagrange Point 1.',
    },
    {
        id: 3,
        title: 'NASA\'s Perseverance Discovers Organic Molecules on Mars',
        agency: 'NASA',
        date: '2024-01-15',
        description: 'Rover finds compelling evidence of ancient organic chemistry in Jezero Crater.',
    },
    {
        id: 4,
        title: 'Juno Extended Mission Reveals Jupiter\'s Deep Atmosphere',
        agency: 'NASA',
        date: '2024-02-01',
        description: 'New data shows unexpected complexity in Jupiter\'s atmospheric dynamics.',
    },
    {
        id: 5,
        title: 'Mars Orbiter Mission Completes 10 Years in Orbit',
        agency: 'ISRO',
        date: '2024-09-24',
        description: 'Mangalyaan continues to provide valuable data on Martian atmosphere.',
    },
    {
        id: 6,
        title: 'Europa Clipper Preparations Enter Final Phase',
        agency: 'NASA',
        date: '2024-10-10',
        description: 'Mission to explore Jupiter\'s icy moon on track for 2024 launch.',
    },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const fetchSatelliteCount = async (planetName) => {
    await delay(500); // Simulate network delay
    const data = satelliteData[planetName.toLowerCase()];
    if (!data) {
        throw new Error(`No satellite data available for ${planetName}`);
    }
    return data;
};

export const fetchAllSatelliteCounts = async () => {
    await delay(800);
    return satelliteData;
};

export const fetchMissionNews = async (limit = 6) => {
    await delay(600);
    return missionNews.slice(0, limit);
};

export const fetchISROMissions = async () => {
    await delay(500);
    const isroMissions = [
        {
            name: 'Chandrayaan-3',
            target: 'Moon',
            status: 'Active',
            launched: '2023-07-14',
            description: 'Lunar exploration mission with lander and rover',
        },
        {
            name: 'Aditya-L1',
            target: 'Sun-Earth L1',
            status: 'Active',
            launched: '2023-09-02',
            description: 'Solar observatory studying the Sun',
        },
        {
            name: 'Mars Orbiter Mission',
            target: 'Mars',
            status: 'Active',
            launched: '2013-11-05',
            description: 'India\'s first interplanetary mission',
        },
        {
            name: 'Gaganyaan',
            target: 'Earth Orbit',
            status: 'Planned',
            launched: 'TBD 2025',
            description: 'India\'s first crewed orbital spacecraft',
        },
    ];
    return isroMissions;
};

// Calculate total statistics
export const getTotalStatistics = async () => {
    await delay(400);
    const allData = await fetchAllSatelliteCounts();

    let totalSatellites = 0;
    let totalNASA = 0;
    let totalISRO = 0;
    let totalOther = 0;

    Object.values(allData).forEach(planet => {
        totalSatellites += planet.total;
        totalNASA += planet.nasa;
        totalISRO += planet.isro;
        totalOther += planet.other;
    });

    return {
        total: totalSatellites,
        nasa: totalNASA,
        isro: totalISRO,
        other: totalOther,
    };
};

import { create } from 'zustand';
import { fetchSatelliteCount, fetchMissionNews, fetchISROMissions } from '../services/api';
import { planetData } from '../data/planetData';

const useStore = create((set, get) => ({
    focusedPlanet: null, // null means solar system view
    satelliteData: {},
    missionNews: [],
    isroMissions: [],
    isLoading: false,
    error: null,

    setFocusedPlanet: (planetName) => set({ focusedPlanet: planetName ? planetData[planetName.toLowerCase()] : null }),

    fetchInitialData: async () => {
        set({ isLoading: true });
        try {
            // Parallel fetch for efficiency
            const [news, isro, satData] = await Promise.all([
                fetchMissionNews(),
                fetchISROMissions(),
                // We'll fetch satellite data for all planets one by one or create a bulk fetch if API supported it
                // For now, let's just ready the structure
                Promise.resolve({})
            ]);

            set({ missionNews: news, isroMissions: isro, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch initial data", error);
            set({ error: error.message, isLoading: false });
        }
    },

    // Action to fetch satellite counts for a specific planet
    getSatelliteCount: async (planetName) => {
        const currentData = get().satelliteData;
        if (currentData[planetName]) return; // Already fetched

        try {
            const data = await fetchSatelliteCount(planetName);
            set((state) => ({
                satelliteData: { ...state.satelliteData, [planetName]: data }
            }));
        } catch (error) {
            console.error(`Failed to fetch satellite data for ${planetName}`, error);
        }
    }
}));

export default useStore;

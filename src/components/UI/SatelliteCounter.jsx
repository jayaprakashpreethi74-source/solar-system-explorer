import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';

const SatelliteCounter = () => {
    const { focusedPlanet, satelliteData, getSatelliteCount } = useStore();
    const [count, setCount] = useState(0);

    // Fetch data when planet focus changes
    useEffect(() => {
        if (focusedPlanet) {
            getSatelliteCount(focusedPlanet.name.toLowerCase());
        }
    }, [focusedPlanet, getSatelliteCount]);

    // Animate the counter when data arrives
    useEffect(() => {
        let target = 0;
        if (focusedPlanet) {
            const data = satelliteData[focusedPlanet.name.toLowerCase()];
            if (data) target = data.total;
        }

        // Simple count-up animation
        let start = 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(target * ease));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [satelliteData, focusedPlanet]);

    if (!focusedPlanet) return null;

    const data = satelliteData[focusedPlanet.name.toLowerCase()];

    return (
        <div className="hud-panel mb-4">
            <div className="hud-panel-header flex justify-between items-center">
                <span>Satellite Tracker</span>
                {data && <span className="satellite-badge">{data.total} Active</span>}
            </div>

            {data ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-cyan-glow/20 pb-2">
                        <span className="hud-text">NASA Missions</span>
                        <span className="hud-value text-lg">{data.nasa}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-cyan-glow/20 pb-2">
                        <span className="hud-text">ISRO Missions</span>
                        <span className="hud-value text-lg">{data.isro}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-cyan-glow/20 pb-2">
                        <span className="hud-text">Other Agencies</span>
                        <span className="hud-value text-lg">{data.other}</span>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-cyan-glow text-xs uppercase mb-2">Key Missions</h4>
                        <div className="max-h-32 overflow-y-auto custom-scrollbar pr-1">
                            {data.missions.length > 0 ? (
                                data.missions.map((mission, idx) => (
                                    <div key={idx} className="bg-space-darker/40 p-2 rounded mb-1 border border-cyan-glow/10 flex justify-between text-xs">
                                        <span className="text-white">{mission.name}</span>
                                        <span className={`
                                            ${mission.status === 'Active' ? 'text-green-400' : ''}
                                            ${mission.status === 'Planned' ? 'text-yellow-400' : ''}
                                            ${mission.status === 'Completed' ? 'text-gray-400' : ''}
                                        `}>{mission.status}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-xs italic">No major missions listed</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-glow"></div>
                </div>
            )}
        </div>
    );
};

export default SatelliteCounter;

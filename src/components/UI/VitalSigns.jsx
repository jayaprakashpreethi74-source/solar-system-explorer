import React from 'react';
import useStore from '../../store/useStore';
import Icon from './Icon';

const VitalSigns = () => {
    const { focusedPlanet } = useStore();

    if (!focusedPlanet) {
        return (
            <div className="hud-panel">
                <div className="text-center text-cyan-glow/50 py-4 italic text-sm">
                    Select a planet to view vital signs
                </div>
            </div>
        );
    }

    return (
        <div className="hud-panel">
            <div className="hud-panel-header">
                System Diagnostics: {focusedPlanet.name}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Temperature */}
                <div className="data-item flex items-center gap-3">
                    <Icon name="thermometer" size={24} className="text-red-400" />
                    <div>
                        <div className="data-label">Surface Temp</div>
                        <div className="data-value">{focusedPlanet.temperature}</div>
                    </div>
                </div>

                {/* Gravity */}
                <div className="data-item flex items-center gap-3">
                    <Icon name="activity" size={24} className="text-purple-400" />
                    <div>
                        <div className="data-label">Gravity</div>
                        <div className="data-value">{focusedPlanet.gravity}</div>
                    </div>
                </div>

                {/* Orbit Speed */}
                <div className="data-item flex items-center gap-3">
                    <Icon name="timer" size={24} className="text-blue-400" />
                    <div>
                        <div className="data-label">Orbit Speed</div>
                        <div className="data-value text-sm">{focusedPlanet.orbitSpeed * 1000} km/s (Rel)</div>
                    </div>
                </div>

                {/* Distance */}
                <div className="data-item flex items-center gap-3">
                    <Icon name="move" size={24} className="text-green-400" />
                    <div>
                        <div className="data-label">Dist. to Sun</div>
                        <div className="data-value text-sm">{focusedPlanet.distanceFromSun}</div>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-2 bg-gold-glow/5 border border-gold-glow/20 rounded text-center">
                <span className="text-gold-glow text-xs uppercase tracking-widest">
                    Status: Tracking {focusedPlanet.name} Orbit
                </span>
            </div>
        </div>
    );
};

export default VitalSigns;

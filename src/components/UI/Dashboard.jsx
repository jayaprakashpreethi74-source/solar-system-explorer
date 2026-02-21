import React from 'react';
import useStore from '../../store/useStore';
import SatelliteCounter from './SatelliteCounter';
import MissionLog from './MissionLog';
import VitalSigns from './VitalSigns';
import Icon from './Icon';

const Dashboard = () => {
    const { focusedPlanet, setFocusedPlanet } = useStore();

    return (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
            {/* Header */}
            <header className="flex justify-between items-start pointer-events-auto w-full">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-blue-500 text-glow-cyan">
                        SOLAR SYSTEM <span className="text-gold-glow">EXPLORER</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-cyan-glow/70 uppercase tracking-widest">Live Link Established // ISSDC Node Active</span>
                    </div>
                </div>

                {/* Quick Navigation */}
                <nav className="flex gap-2">
                    {['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map(p => (
                        <button
                            key={p}
                            onClick={() => setFocusedPlanet(p)}
                            className={`px-3 py-1 rounded text-xs uppercase tracking-widest backdrop-blur-sm transition-all border ${focusedPlanet?.name === p
                                ? 'bg-cyan-glow/30 border-cyan-glow text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                                : 'bg-cyan-glow/10 border-cyan-glow/30 text-cyan-glow hover:bg-cyan-glow/20'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </nav>

                {focusedPlanet && (
                    <button
                        onClick={() => setFocusedPlanet(null)}
                        className="bg-red-500/20 hover:bg-red-500/40 border border-red-500 text-red-200 px-4 py-2 rounded flex items-center gap-2 transition-all ml-4"
                    >
                        <Icon name="x" size={16} />
                        Exit Focus
                    </button>
                )}
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex mt-8 gap-6 min-h-0">
                {/* Left Sidebar - Navigation/List of Planets could go here, keeping it clean for now */}

                {/* Middle - Viewport (Empty for 3D view) */}
                <div className="flex-1"></div>

                {/* Right Sidebar - HUD */}
                <aside className="w-80 flex flex-col gap-2 pointer-events-auto animate-slide-in relative h-full">
                    {/* Scroll Up Button */}
                    <button
                        onClick={() => document.getElementById('hud-scroll-container').scrollBy({ top: -100, behavior: 'smooth' })}
                        className="w-full bg-cyan-900/50 hover:bg-cyan-700/50 text-cyan-glow py-1 text-xs uppercase tracking-widest border border-cyan-900/30 rounded flex justify-center items-center"
                    >
                        <Icon name="chevron-up" size={16} />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        id="hud-scroll-container"
                        className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pr-1 pb-16" // Added padding-bottom 16 (4rem) to clear footer/button
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for clean UI
                    >
                        <SatelliteCounter />
                        <VitalSigns />

                        {/* Wrapper to ensure Mission Log has space to expand */}
                        <div className="flex-1 min-h-[300px] flex flex-col">
                            <MissionLog />
                        </div>
                    </div>

                    {/* Scroll Down Button */}
                    <button
                        onClick={() => document.getElementById('hud-scroll-container').scrollBy({ top: 100, behavior: 'smooth' })}
                        className="w-full bg-cyan-900/50 hover:bg-cyan-700/50 text-cyan-glow py-1 text-xs uppercase tracking-widest border border-cyan-900/30 rounded flex justify-center items-center"
                    >
                        <Icon name="chevron-down" size={16} />
                    </button>
                </aside>
            </div>

            {/* Footer */}
            <footer className="pointer-events-auto flex justify-between items-end mt-4">
                <div className="text-[10px] text-white/30 font-mono">
                    COORD: {Math.random().toFixed(4)} : {Math.random().toFixed(4)}<br />
                    FOV: 60.00
                </div>
                <div className="bg-space-darker/80 border border-white/10 px-3 py-1 rounded text-xs text-white/50 flex items-center gap-2">
                    <Icon name="monitor" size={12} />
                    <span>System Status: Nominal</span>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;

import React, { useEffect } from 'react';
import Scene from './components/Scene';
import Dashboard from './components/UI/Dashboard';
import useStore from './store/useStore';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const { fetchInitialData } = useStore();

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    return (
        <main className="w-full h-screen relative overflow-hidden selection:bg-cyan-glow selection:text-black">
            {/* <ErrorBoundary> */}
            {/* 3D Background Layer */}
            <Scene />

            {/* UI Overlay Layer */}
            <Dashboard />
            {/* </ErrorBoundary> */}

            {/* Subtle Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-20"></div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        </main>
    );
}

export default App;

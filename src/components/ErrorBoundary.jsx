import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("System Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 bg-black flex items-center justify-center p-10 z-[100]">
                    <div className="border border-red-500 p-8 bg-black/80 rounded shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                        <h2 className="text-red-500 font-bold text-2xl mb-4 uppercase tracking-tighter">
                            System Malfunction
                        </h2>
                        <p className="text-red-200/80 mb-6 font-mono text-sm leading-relaxed">
                            {this.state.error?.message || "Visual stream interrupted. Please refresh the module."}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-orbitron transition-all"
                        >
                            REBOOT SYSTEM
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

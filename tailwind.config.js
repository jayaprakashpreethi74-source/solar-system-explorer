/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'space-dark': '#0a0e27',
                'space-darker': '#050814',
                'cyan-glow': '#00f0ff',
                'gold-glow': '#ffd700',
                'hud-cyan': '#00d9ff',
                'hud-gold': '#ffb800',
                'border': '#1a1a1a',
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'rajdhani': ['Rajdhani', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
                    '100%': { boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}

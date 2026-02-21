import React from 'react';
import useStore from '../../store/useStore';

// Simple text or SVG replacements for icons
const Icon = ({ name, size = 16, className = "" }) => {
    // Basic SVG paths for icons
    const icons = {
        rss: <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
        thermometer: <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />,
        timer: <path d="M10 2h4M12 14v-4M6.6 6.6l1.4 1.4M18.4 6.6l-1.4 1.4M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />,
        activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
        move: <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M15 19l-3 3-3-3M9 9h6v6H9z" />,
        monitor: <path d="M2 3h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm6 18h8" />,
        "chevron-up": <path d="M18 15l-6-6-6 6" />,
        "chevron-down": <path d="M6 9l6 6 6-6" />,
        x: <path d="M18 6L6 18M6 6l12 12" />
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {icons[name] || <circle cx="12" cy="12" r="10" />}
        </svg>
    );
};

export default Icon;

import { NavigationItem } from "./navigation.types";

export const ZoomIn = (onClick: (props?: any) => void) : NavigationItem => ({
    id: 'zoom-in',
    label: 'Zoom In',
    color: '#00b4d8', // gradient-teal
    icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
    ),
    onClick
});

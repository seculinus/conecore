import { NavigationItem } from "./navigation.types";


export const FullScreen = (): NavigationItem => ({
    id: 'fullscreen',
    label: 'Fullscreen',
    color: '#1e1b4b', // gradient-navy
    icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
    ),
    onClick:()=>{}
});


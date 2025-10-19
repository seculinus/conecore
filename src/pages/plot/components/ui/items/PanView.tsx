import { NavigationItem } from "./navigation.types";







export const PanView = (onClick: (props?: any) => void): NavigationItem => ({
    id: 'pan',
    label: 'Pan View',
    color: '#8b5cf6', // gradient-purple
    icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
    onClick,
});

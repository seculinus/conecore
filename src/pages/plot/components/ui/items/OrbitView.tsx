import { NavigationItem } from "./navigation.types";


export const OrbitView = (onClick:(props?:any) => void) : NavigationItem =>( {
      id: 'orbit',
      label: 'Orbit View',
      color: '#00d4ff', // gradient-cyan
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="m21 12-6-6-6 6"/>
          <circle cx="12" cy="12" r="10" strokeDasharray="2 2"/>
        </svg>
      ),
      onClick,
    }
)
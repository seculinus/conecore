import  { ReactNode, RefObject, useState } from 'react';
import { motion } from 'motion/react';
import '../Plot.css';
import * as THREE from "three";
import {useContext} from 'react'
import { StateContext } from './StateContext';
import { points } from '../Plot';
interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: (props?:any) => void;
}


export function NavigationMenu() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const {stateContext } = useContext(StateContext);

  const handleItemClick = (id: string, action: () => void) => {
    setActiveItem(id);
    action();
    // Reset active state after animation
    setTimeout(() => setActiveItem(null), 200);
  };
  console.log("helloTom")
  const navigationItems: NavigationItem[] = [
    {
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
      onClick: () => console.log('Orbit controls activated')
    },
    {
      id: 'zoom-in',
      label: 'Zoom In',
      color: '#00b4d8', // gradient-teal
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      ),
      onClick: () => console.log('Zoom in')
    },
    {
      id: 'zoom-out',
      label: 'Zoom Out',
      color: '#0077b6', // gradient-blue
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      ),
      onClick: () => console.log('Zoom out')
    },
    {
      id: 'pan',
      label: 'Pan View',
      color: '#8b5cf6', // gradient-purple
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      onClick: () => console.log('Pan controls activated')
    },
    {
      id: 'reset',
      label: 'Reset View',
      color: '#d946ef', // gradient-magenta
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M8 16H3v5"/>
        </svg>
      ),
      onClick: () => {
      if (!stateContext?.controls || !stateContext?.camera) {
          console.warn('State context or Controls not ready');
          return;
        }
        
        const posCamera = stateContext.camera.position;
          stateContext.camera.position.set(0, 0, 10);
          stateContext.camera.zoom = 10;
          stateContext.camera.updateProjectionMatrix();
          stateContext.controls.target.set(0,0,10);
          stateContext.controls.update(); 
          
        console.log('Reset camera view')
      
      }
    },
    {
      id: 'wireframe',
      label: 'Toggle Wireframe',
      color: '#6366f1', // gradient-dark-purple
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      onClick: () => console.log('Toggle wireframe mode')
    },
    {
      id: 'fullscreen',
      label: 'Fullscreen',
      color: '#1e1b4b', // gradient-navy
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      ),
      // onClick: () => console.log('Toggle fullscreen')
      onClick: ()=>{
        if (!stateContext?.controls || !stateContext?.camera) {
          console.warn('State context or Controls not ready');
          return;
        }
        //Third time the charm with state
          console.log(stateContext);
          const posCamera = stateContext.camera.position;
          console.log(stateContext.camera.position);
          console.log(stateContext.controls.target);
          stateContext.camera.zoom = .55;
          stateContext.camera.position.set(points[2].x, points[2].y
            , 15);
            stateContext.camera.updateProjectionMatrix();
          stateContext.controls.target.set(stateContext.camera.position.x, stateContext.camera.position.y,0);
          stateContext.controls.update();

        
        //Second Time with Controls
        // control.control.current.target.set(new THREE.Vector3(-25,0,0));
        // control.control.current.update();
        
        //First Time with Camera
      //  camera.position.set(50,camera.position.y,camera.position.z);
      //  camera.lookAt(502,0,0)
      //  camera.updateProjectionMatrix();
     
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      color: '#0f0f23', // gradient-dark
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      onClick: () => console.log('Open settings')
    }
  ];

return (
  <div className="navigation-container">
    <div className="navigation-panel">
      <div className="navigation-grid">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            className="navigation-item"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item.id, item.onClick)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor:
                activeItem === item.id
                  ? `${item.color}40`
                  : 'rgba(255, 255, 255, 0.05)',
            }}
     
          >
            <motion.div
              className="navigation-hover-overlay"
              style={{
                background: `linear-gradient(45deg, ${item.color}20, ${item.color}40)`,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="navigation-icon"
              style={{
                color:
                  hoveredItem === item.id || activeItem === item.id
                    ? item.color
                    : undefined,
              }}
  
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>

            {activeItem === item.id && (
              <motion.div
                className="navigation-ripple"
                style={{ borderColor: item.color }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}

            {hoveredItem === item.id && (
              <motion.div
                className="navigation-tooltip"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <div className="navigation-tooltip-arrow" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
);
}
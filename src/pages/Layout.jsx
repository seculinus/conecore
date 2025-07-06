import './Layout.css'
import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import HomeIcon from '../assets/icons/HomeIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';
import LoadIcon from '../assets/icons/LoadIcon';
import CalcIcon from '../assets/icons/CalcIcon';
import PlotIcon from '../assets/icons/PlotIcon';
import PrintIcon from '../assets/icons/PrintIcon';
import DecomposeIcon from '../assets/icons/DecomposeIcon';
import ConeCoreIcon from '../assets/icons/ConeCoreIcon';
import SingleArrowIcon from '../assets/icons/SingleArrowIcon';
import DoubleArrowIcon from '../assets/icons/DoubleArrowIcon';
const Layout = () =>{

    const toggleButton = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');

    function toggleSideBar(){
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
    }

    const [isCalcDropped, setCalcDropped] = useState(false)
    const [isPlotDropped, setPlotDropped] = useState(false)



    // function toggleSubMenu(){
    //      event.target.classList.toggle('show');
    //      event.target.toggle('rotate');
    // }

    function handleCalcClick (){
            setCalcDropped(!isCalcDropped);
            const subMenu = document.querySelector(".sub-menu");
            isCalcDropped? subMenu.classList.remove("show") : subMenu.classList.add("show")
            event.target.parentElement.parentElement.classList.toggle('rotate')
            // console.log(event.target.parentElement.parentElement.nextElementSibling) 
            // event.target.parentElement.parentElement.nextElementSibling.classList.toggle('show');
    }
    const handlePlotClick = ()=>{
            setPlotDropped(!isPlotDropped);
            const subMenu = document.querySelectorAll(".sub-menu")[1];
            isPlotDropped? subMenu.classList.remove("show") : subMenu.classList.add("show") 
    }

    return(
        <>
        <nav id = 'sidebar'>
        
        <ul className = 'navigation' >
            {/* <div>ConeCore</div> */}
            <li className = 'logo'>
                <ConeCoreIcon></ConeCoreIcon>
                <button
                 id = "toggle-btn"
                onClick={toggleSideBar}
                >
                    <DoubleArrowIcon ></DoubleArrowIcon>
                </button>
            </li>
            <li className = 'active'>
                <NavLink to = '/'>
                    <HomeIcon></HomeIcon>
                    <span>Home</span>
                </NavLink>
            </li>

            <li>
                <NavLink to = '/Settings'>
                    <SettingsIcon></SettingsIcon>
                    <span>Settings</span>
                </NavLink>
            </li>

            <li>
                <NavLink to = '/Load'>
                    <LoadIcon></LoadIcon>
                    <span>Load</span>
                </NavLink>
            </li>

            <li>
                <button 
                className = "dropdown-btn"
                onClick = {handleCalcClick}
                >
                    <NavLink to = '/Calc'>
                        <CalcIcon></CalcIcon>
                        <span>Calc</span>
                        <SingleArrowIcon></SingleArrowIcon>
                    </NavLink>
                </button>
                <ul className = "sub-menu">
                    <div>
                        <li> <a href="#">Item1</a> </li>
                        <li> <a href="#">Item2</a> </li>
                        <li> <a href="#">Item3</a> </li>
                    </div>
                </ul>
            </li>
            <li>
                <button 
                className = "dropdown-btn"
                onClick={handlePlotClick}
                >
                    
                    <NavLink to = '/Plot'>
                        <PlotIcon></PlotIcon>                    
                        <span>Plot</span>
                        <SingleArrowIcon></SingleArrowIcon>
                    </NavLink>
                </button>
                <ul className = "sub-menu">
                    <div>
                        <li> <a href="#">Item1</a> </li>
                        <li> <a href="#">Item2</a> </li>
                        <li> <a href="#">Item3</a> </li>
                        <li> <a href="#">Item4</a> </li>
                        <li> <a href="#">Item5</a> </li>
                    </div>
                </ul>
            </li>
            <li>
                <NavLink to = '/Print'>
                    <PrintIcon></PrintIcon>
                    <span>Print</span>
                </NavLink>
            </li>
            <li>
                <NavLink to = '/Decompose'>
                    <DecomposeIcon></DecomposeIcon>
                    <span>Decompose</span>
                </NavLink>
            </li>


        </ul>
        </nav>
        <main>
        <Outlet/>
        </main>
        </>
    )

}

export default Layout;
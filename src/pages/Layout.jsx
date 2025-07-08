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
import SubdirectoryArrowIcon from '../assets/icons/SubDirectoryIcon';



const SubMenuComponent = ({noItems, isShown})=>{

    const items = [];
    for (let i = 0; i<= noItems; i++)
        items.push(i);

    return (
        <ul className = {isShown? "sub-menu show" : "sub-menu"}>
            <div>
                {items.map(num =>
                    <li key = {num}>
                        <SubdirectoryArrowIcon></SubdirectoryArrowIcon> 
                        <a href="#">Item{num}</a> 
                    </li>
                )}
            </div>
        </ul>
    )
}



const DropDownMenuComponent = ({items, children, id}) => {

    const [isShown , setShown] = useState(false);

    function handleClick(){
        setShown(!isShown);
        // console.log(event.target.parentElement.parentElement.classList)
        // isShown? subMenu.classList.remove("show") : subMenu.classList.add("show")
        // event.target.parentElement.parentElement.classList.toggle('rotate')
    }
    
    return (
        <li numId ={id}>
            <button 
            className = { isShown? "dropdown-btn rotate":"dropdown-btn" }
            onClick = {handleClick}
            >
                {children}
            </button>
            <SubMenuComponent noItems ={items} isShown={isShown}></SubMenuComponent>

        </li>
    )
}


const Layout = () =>{

    const toggleButton = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');

    const [activeIndex, setActiveIndex] = useState(0);
    const listItems = document.querySelectorAll(".navigation > li")

    function handleActiveIndex(event){
        console.log(activeIndex)
        // listItems[activeIndex].classList.toggle('active');
        const newIndex = event.target.parentElement.getAttribute("numid");
        setActiveIndex(newIndex);
        listItems[newIndex].classList.toggle('active');
    }

    function toggleSideBar(){
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
    }

    return(
        <>
        <nav id = 'sidebar'>
        <ul 
        className = 'navigation' 
        onClick={handleActiveIndex}
        >
            <li className = 'logo'>
                <ConeCoreIcon></ConeCoreIcon>
                conecore
                <button
                 id = "toggle-btn"
                onClick={toggleSideBar}
                >
                    <DoubleArrowIcon ></DoubleArrowIcon>
                </button>
            </li>
            <li className = 'active' numId = {1}>
                <NavLink to = '/'>
                    <HomeIcon></HomeIcon>
                    <span>Home</span>
                </NavLink>
            </li>

            <li numId = {2}>
                <NavLink to = '/Settings'>
                    <SettingsIcon></SettingsIcon>
                    <span>Settings</span>
                </NavLink>
            </li>

            <li numId = {3}>
                <NavLink to = '/Load'>
                    <LoadIcon></LoadIcon>
                    <span>Load</span>
                </NavLink>
            </li>
            <DropDownMenuComponent
                items = {3}
                children = {
                    <NavLink to = '/Calc'>
                        <CalcIcon></CalcIcon>
                        <span>Calc</span>
                        <SingleArrowIcon></SingleArrowIcon>
                    </NavLink>
                }
                numId = {4}
            >

            </DropDownMenuComponent>

            <DropDownMenuComponent
            key = {2}
                items = {5}
                children = {
          
                    <NavLink to = '/Plot'>
                        <PlotIcon></PlotIcon>                    
                        <span>Plot</span>
                        <SingleArrowIcon></SingleArrowIcon>
                    </NavLink>
                }
                numId = {5}
            ></DropDownMenuComponent>
                
            <li numId = {6}>
                <NavLink to = '/Print'>
                    <PrintIcon></PrintIcon>
                    <span>Print</span>
                </NavLink>
            </li>
            <li numId = {7}>
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
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



const DropDownMenuComponent = ({items, children, numid, clickHandler}) => {

    const [isShown , setShown] = useState(false);

    function handleClick(){
        setShown(!isShown);
        // console.log(event.target.parentElement.parentElement.classList)
        // isShown? subMenu.classList.remove("show") : subMenu.classList.add("show")
        // event.target.parentElement.parentElement.classList.toggle('rotate')
    }
    
    return (
        <li numid = {numid} onClick={clickHandler}>
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

function getAttributeLevel(parent, attribute,  level,  currentLevel,){
        if(!parent.hasAttribute() && currentLevel < level)
            return getAttributeLevel(parent.parentElement,attribute, level, ++currentLevel)
        return parent.getAttribute(attribute);
}


const Layout = () =>{
    
    const listItems = document.querySelectorAll(".navigation > li")
    const toggleButton = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');

    const [activeIndex, setActiveIndex] = useState(1);
    
    
    function handleActiveIndex(e){
        let newIndex;
        
        if(e.target.hasAttribute('numid'))
            newIndex = e.target.getAttribute('numid')
        else if(e.target.parentElement.hasAttribute('numid'))
            newIndex = e.target.parentElement.getAttribute('numid')
        else if(e.target.parentElement.parentElement.hasAttribute('numid'))
            newIndex = e.target.parentElement.parentElement.getAttribute('numid')
        else
        newIndex = e.target.parentElement.parentElement.parentElement.getAttribute('numid');
    console.log('Activbe index is:', activeIndex)
    console.log("event target is", newIndex)
    listItems[activeIndex].classList.toggle('active');
    setActiveIndex(Number(newIndex));
    listItems[newIndex].classList.toggle('active');
    e.stopPropagation();
    
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
            <li className = 'active' numid = {1} onClick={handleActiveIndex}>
                <NavLink to = '/'>
                    <HomeIcon></HomeIcon>
                    <span>Home</span>
                </NavLink>
            </li>

            <li numid = {2} onClick={handleActiveIndex}>
                <NavLink to = '/Settings'>
                    <SettingsIcon></SettingsIcon>
                    <span>Settings</span>
                </NavLink>
            </li>

            <li numid = {3} onClick={handleActiveIndex}>
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
                numid = {4}
                clickHandler={handleActiveIndex}
            >

            </DropDownMenuComponent>

            <DropDownMenuComponent

                items = {5}
                children = {
          
                    <NavLink to = '/Plot'>
                        <PlotIcon></PlotIcon>                    
                        <span>Plot</span>
                        <SingleArrowIcon></SingleArrowIcon>
                    </NavLink>
                }
                numid = {5}
                clickHandler={handleActiveIndex}
            ></DropDownMenuComponent>
                
            <li numid = {6} onClick={handleActiveIndex}>
                <NavLink to = '/Print'>
                    <PrintIcon></PrintIcon>
                    <span>Print</span>
                </NavLink>
            </li>
            <li numid = {7} onClick={handleActiveIndex}>
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
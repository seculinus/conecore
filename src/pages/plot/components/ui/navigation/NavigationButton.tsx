import {Box, IconButton } from "@chakra-ui/react";
import { NavigationItem } from "../items/navigation.types";

interface NavigationButtonprops  {
  item: NavigationItem;
  isActive?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export function NavigationButton({item,isActive, isHovered, onMouseEnter, onMouseLeave,onClick}:NavigationButtonprops){
 return (

    <IconButton
        bg= 'hover'
        borderRadius={'lg'}
        aria-label={item.label}
        size={'lg'}
        color={isHovered ? 'primary' : 'white'}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        {item.icon}
    </IconButton>

 )
}

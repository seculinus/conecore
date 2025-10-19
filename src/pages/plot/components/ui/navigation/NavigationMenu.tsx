import { useState } from 'react';
import { Box, Grid} from "@chakra-ui/react";
import { NavigationButton } from './NavigationButton';
import { NavigationItem } from '../items/navigation.types';

type NavigationMenuProps = {
  items: NavigationItem[];
  columns?: number;
  direction?: "horizontal" | "vertical";
  placement?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
};

export default function NavigationMenu({
  items,
  columns = 2,
  direction = "horizontal",
  placement = { top: '1.5rem', right: '1.5rem' },
}: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (id: string, action: () => void) => {
    setActiveItem(id);
    action();
    setTimeout(() => setActiveItem(null), 200);
  };



  const gridTemplateColumns =
    direction === "horizontal" ? `repeat(${columns}, 1fr)` : `1fr`;
  const gridTemplateRows =
    direction === "vertical" ? `repeat(${items.length}, auto)` : undefined;

  return (
    <Box
      position="fixed"
      top={placement.top}
      bottom={placement.bottom}
      left={placement.left}
      right={placement.right}
      transform={placement.transform}
      zIndex="50"
    >
      <Box
        bg={'main'}
        backdropFilter="blur(12px)"
        borderRadius="1rem"
        p="0.75rem"
        border="1px solid"
        borderColor='gray.700'
      >
        <Grid
          templateColumns={gridTemplateColumns}
          templateRows={gridTemplateRows}
          gap="0.5rem"
        >
          {items.map((item) => (
            <NavigationButton
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              isHovered={hoveredItem === item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item.id, item.onClick)}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

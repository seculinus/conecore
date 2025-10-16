import { Menu, Button, Portal} from "@chakra-ui/react"
import { STATUSES } from "./data";
import { Box } from "@chakra-ui/react";

export function ColorIcon({color, ...props}){
    return (
<Box w="12px" h ="12px" bg ={color} borderRadius="3px" {...props}>
</Box>
    )
}

export function StatusCell({getValue,row,column,table}){
    const { name,color} = getValue() || {};
    const {updateData} = table.options.meta;

    return (

        <Menu.Root isLazy offset = {[0,0]} flip={false} autoSelect = {false}>
            <Menu.Trigger asChild>
                <Button 
                    border={"none"}
                    h="80%"
                    w="80%" 
                    alignItems={"bottom"}
                    justifyContent={"center"}
                    justifyItems ={"center"}
                    textAlign ="left"
                    color={'#808487'}
                    bg={color || "transparent"}
                    p={1.5} variant = "outline"
                    size ="sm"
                >
                    {name}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content  >
                            <Menu.Item className = "menuStatuses"
                                background={'#272A31'}
                                color ={'#808487'}
                                onClick = {() => updateData(row.index, column.id, null)}
                                key = {-1}    
                            >
                                <ColorIcon color = {'red.400'} mr ={3}/>
                                Reset
                            </Menu.Item>
                        
                        {STATUSES.map(status=>
                       
                            <Menu.Item className = "menuStatuses"
                                background={'#272A31'}
                                color ={'#808487'}
                                onClick = {() => updateData(row.index, column.id, status)}
                                key = {status.id}    
                            >
                                <ColorIcon color = {status.color} mr ={3}/>
                                {status.name}
                            </Menu.Item>
                        )}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}
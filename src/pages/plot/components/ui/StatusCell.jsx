import { Menu, Button, Portal} from "@chakra-ui/react"
import { STATUSES } from "./data";
// --hover-color:#272A31;
// --inactive-color:#808487;


export function StatusCell({getValue}){
    const {
        name,color
    } = getValue() || {};

    const {updateData} = table.data.options.meta;''

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
                    <Menu.Content>
                        {STATUSES.map(status=>{
                            <Menu.Item 
                                onClick = {
                                    //function that updates our table state

                                }
                            >{status.name}</Menu.Item>
                        })}
                        <Menu.Item value = "new-txt">Download</Menu.Item>
                        <Menu.Item value = "new-file">Create a Copy</Menu.Item>
                        <Menu.Item>Mark as a Draft</Menu.Item>
                        <Menu.Item>Delte</Menu.Item>
                        <Menu.Item>Attend a workshop</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}
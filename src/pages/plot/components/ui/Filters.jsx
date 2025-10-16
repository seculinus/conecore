import { Box,VStack,HStack, Icon, Input, InputElement, InputGroup } from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";
import { FilterPopover } from "./FilterPopover";

export function Filters({columnFilters, setColumnFilters}){
    
    const taskName = columnFilters.find(f=> f.id ==='task')?.value || " ";

    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })
    )
    return (


        <Box  className = "filterBar" >
            <HStack mb ={6} spacing = {1} >
                <InputGroup 
                startElement= {<Icon as = {SearchIcon} ml ={3} boxSize ={6} />}
                gap ={0}
                
                >
                    <Input
                        w ={250}
                        type = 'text'
                        variant = 'filled'
                        placeholder ='Task name'
                        borderRadius ={5}
                        value ={taskName}
                        onChange ={(e)=>onFilterChange('task', e.target.value)
                            
                        }
                        /> 
                </InputGroup>
                <FilterPopover></FilterPopover>
            </HStack>   
        </Box>
    )
}
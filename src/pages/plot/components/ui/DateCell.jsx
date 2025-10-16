import { Center, Icon , Box} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./icons/CalendarIcon";
import { useRef, forwardRef} from "react";



const DateCustomInput = forwardRef(({value, onClick, clearDate}, ref) =>{
    return (
        <Center  onClick = {onClick}  cursor = 'pointer' ref={ref}  >
        {value ? 
        <>
        {value}
        <Box
            pos = "absolute"
            right = {3}
            fontSioze = "md"
            color = "red.300"
            onClick ={(e) => {
                e.stopPropagation();
                clearDate()}}
        >
        &times;
       </Box>
        </> : 
        <Icon as = {CalendarIcon} fontSize='xs' />}
    </Center>
    )
});


export function DateCell({getValue, row, column, table}){
    const date = getValue();
    const {updateData} = table.options.meta;
    const ref = useRef();

    return (
        <DatePicker 
        wrapperClassName = "date-wrapper"
        dateFormat = 'MMM d'
        selected = {date}
        onChange = {(date) => updateData(row.index, column.id, date)}
        customInput = {<DateCustomInput clearDate ={() =>updateData(row.index, column.id, null)}/>}
        />
        
    )

}




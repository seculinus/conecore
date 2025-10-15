import { Input } from "@chakra-ui/react";
import { useState,useEffect } from "react";

export function EditableCell({getValue, row, column, table}){
    const initialValue = getValue();
    const [value, SetValue ] = useState(initialValue);

    const onBlur = () => {
        table.options.meta?.updateData(
            row.index,
            column.id,
            value
        )
    }

    useEffect(()=>{
        SetValue(initialValue)
    },[initialValue])

    return (
        <Input
        value = {value}
        onChange = {
            e => SetValue(e.target.value)
        }
        onBlur = {onBlur}
        variant = "filled"
        size = "sm"
        w = "85%"
        overflow = "hidden"
        textOverflow = "ellipsis"
        whiteSpace="nowrap"      
        />
        
    )
}
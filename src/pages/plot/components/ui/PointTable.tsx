import { Box } from "@chakra-ui/react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState, useMemo } from "react";
import { DATA } from "./data";
import { EditableCell } from "./EditableCell";
import { StatusCell } from "./StatusCell";

type Test = {
    task: string
    status:string
    due:Date
    notes:string
}

export function PointTable(){
    console.log("PointTable rendered"); // Add this
    const [data, setData] = useState<Test[]>(DATA);
    
    const columns = useMemo(()=>  [{ 
            accessorKey: 'task',
            header:"Task",
            size:225,
            // cell: (props) => <p>{props.getValue()}</p>
            cell:EditableCell
        },
        { 
            accessorKey: 'status',
            header:"Status",
            // cell: (props) => <p>{props.getValue()}</p>
            cell: StatusCell
        },
        { 
            accessorKey: 'due',
            header:"Due",
            cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>
        },
        { 
            accessorKey: 'notes,',
            header:"Notes",
            cell: (props) => <p>{props.getValue()}</p>
        }],  [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode:"onEnd",
        meta:{ 
            updateData: (rowIndex, columnId, value)=>
                setData((prev) => 
                    prev.map((row,index) => 
                        index === rowIndex
                      ? {
                            ...prev[rowIndex],
                            [columnId]:value
                        }: row
            ))
            //Add ways to keep data synced in the table, since changes in the editable cell will not result in a refreshed data state

        }
    });
    // console.log(table.getHeaderGroups());
    console.log("Creating Table")
    console.log(data)
    return(
        <Box>
            <Box className ="table" w ={table.getTotalSize()}  style={{ bottom:500,position:'relative'}}>
                {table.getHeaderGroups().map(headerGroup=> (
                    <Box className = "tr" key = {headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <Box className= "th" w ={header.getSize()} key ={header.id}>
                                {header.column.columnDef.header}
                                <Box 
                                
                                onMouseDown = {
                                    header.getResizeHandler()
                                }
                                onTouchStart = {
                                    header.getResizeHandler()
                                }
                                className ={`resizer ${
                                    header.column.getIsResizing()? "isResizing" : ""} 
                                `}/>
                            </Box>
                        ))}
                        </Box>
                    ))}
                    {table.getRowModel().rows.map((row) =>(
                        <Box className ="tr" key ={row.id}>
                            {row.getVisibleCells().map((cell) =>(
                            <Box className = "td" w={cell.column.getSize()}key ={cell.id}>
                                {
                                    flexRender(cell.column.columnDef.cell,cell.getContext())
                                }
                            </Box>
                            ))}
                        </Box>  
                    ))}
            </Box>
        </Box>
    );
};



import { Box } from "@chakra-ui/react"
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { useState, useMemo } from "react";
import { DATA } from "./data";
import { EditableCell } from "./EditableCell";
import { StatusCell } from "./StatusCell";
import { DateCell } from "./DateCell";
import { Filters } from "./Filters";

type Test = {
    task: string
    status:string
    due:Date
    notes:string
}
const columns =  [{ 
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
            // cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>
            cell: DateCell,
        },
        { 
            accessorKey: 'notes,',
            header:"Notes",
            // cell: (props) => <p>{props.getValue()}</p>
            cell:EditableCell,
        }]

export function PointTable(){
  
    const [data, setData] = useState<Test[]>(DATA);
    const [columnFilters, setColumnFilters] = useState([

    ]);

    const table = useReactTable({
        data,
        columns,
        state :{
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode:"onChange",
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
    console.log(columnFilters)
    return(
        <Box 
        
        // style={{ 
        //     bottom:600,
        //     position:'relative'
        // }}

        style={{ 
                position: 'absolute', // Takes it out of the flow
                top: '650px',         // Clear previous relative style influences
                left: 0,              // Start from the left edge
                bottom: 'unset',      // Clear bottom, or set it (e.g., bottom: 10)
                // You likely want to use a combination of top/bottom and left/right
                // For your previous 'bottom:600' style, let's use 'top' for control.
                // top: '50px', // Example: 50px from the top of the nearest positioned ancestor (usually body)
                // left: '20px' // Example: 20px from the left
            }}
        
        >
            <Filters 
            columnFilters = {columnFilters}
            setColumnFilters = {setColumnFilters}
        />
            <Box className ="table" w ={table.getTotalSize()}  >
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



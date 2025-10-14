import { Box } from "@chakra-ui/react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState, useMemo } from "react";
import { DATA } from "./data";

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
            cell: (props) => <p>{props.getValue()}</p>
        },
        { 
            accessorKey: 'status',
            header:"Status",
            cell: (props) => <p>{props.getValue()}</p>
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
        getCoreRowModel: getCoreRowModel()
    });
    // console.log(table.getHeaderGroups());
    console.log("Creating Table")
    return(
        <Box>
            <Box className ="table" w ={table.getTotalSize()}  style={{ bottom:500,position:'relative'}}>
                {table.getHeaderGroups().map(headerGroup=> (
                    <Box className = "tr" key = {headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <Box className= "th" w ={header.getSize()} key ={header.id}>
                                {header.column.columnDef.header}
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



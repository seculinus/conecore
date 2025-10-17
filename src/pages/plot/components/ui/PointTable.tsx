import { Box, Button } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo , useContext} from "react";
import { EditableCell } from "./EditableCell";
import { StateContext } from "../StateContext";
import * as THREE from "three"

const DATA =[
    {
        northing:100.35,
        easting:100,
    },
    {
        northing:33,
        easting:22,
    }
]
type Point = {
  northing: number;
  easting: number;
};

const columns = [ 
  {
    accessorKey: "northing",
    header: "Northing",
    size: 225,
    cell: EditableCell,
  },
  {
    accessorKey: "easting",
    header: "Easting",
    cell: EditableCell,
  },
];

export function PointTable() {
  const [data, setData] = useState<Point[]>(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const {setPoints} = useContext(StateContext);

    const generatePoints = () => {

    const r3fPts = table.options.data.map((pt,i) => 
      ({
        id: i,
        position: new THREE.Vector3(pt.northing,pt.easting,0)
      })
    )

      console.log("R3f is", r3fPts);
      setPoints(r3fPts);
      console.log("This was pressed")
    }

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
      //Add ways to keep data synced in the table, since changes in the editable cell will not result in a refreshed data state
    },
  });
  
  // console.log(table.getHeaderGroups());
  // console.log("Creating Table");
  // console.log(columnFilters);

  console.log(table.options.data)
  return (
    <Box
      style={{
        position: "absolute", // Takes it out of the flow
        top: "650px", // Clear previous relative style influences
        left: 0, // Start from the left edge
        bottom: "unset", // Clear bottom, or set it (e.g., bottom: 10)
        // You likely want to use a combination of top/bottom and left/right
        // For your previous 'bottom:600' style, let's use 'top' for control.
        // top: '50px', // Example: 50px from the top of the nearest positioned ancestor (usually body)
        // left: '20px' // Example: 20px from the left
      }}
    >
      {/* <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      /> */}
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  } 
                                `}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box display ="flex" justifyContent ="flex-end" mt={3}>
        <Button 
            borderRadius={3}
            background={'gray.800'}
            color ={'yellow.300'}
            _hover ={{background:"cyan.200"}}
            onClick={generatePoints}
        >
            Hss
        </Button>
      </Box>
    </Box>
  );
}

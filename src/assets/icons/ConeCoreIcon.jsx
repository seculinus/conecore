import * as React from "react"

function ConeCoreIcon(props) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}
    width = '36px'
    height = '36px'>

      <rect
        x={5}
        y={5}
        width={90}
        height={90}
        rx={12}
        ry={12}
        fill="none"
        stroke=""
        strokeWidth={5}
      />
      <rect
        x={25}
        y={20}
        width={50}
        height={60}
        rx={3}
        ry={3}
        fill="none"
        stroke=""
        strokeWidth={5}
      />
      {/* <path d="M-50-20V0" stroke="#000" />
      <path
        d="M25 35q10-5 20 0t20 0q5-3 10 0"
        fill="none"
        // stroke="#000"
        strokeWidth={5}
      /> */}
      {/* <ellipse cx={35} cy={45} rx={3} ry={1.5} />
      <ellipse cx={50} cy={42} rx={3} ry={1.5} />
      <ellipse cx={62} cy={47} rx={3} ry={1.5} /> */}
      {/* <path
        d="M25 58q10-5 20 0t20 0q5-3 10 0"
        fill="none"
        // stroke="#000"
        strokeWidth={5}
      /> */}
    </svg>
  )
}

export default ConeCoreIcon

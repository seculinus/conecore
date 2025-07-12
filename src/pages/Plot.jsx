import { parsePoints } from "../utils/point";
const Plot = () =>{

    function handlePointClick(){
        const points = parsePoints();
        console.log(points)
     
    }
    return(
        <div className="container">
            <button className onClick={handlePointClick}>Push me for points</button>
        </div>
    )
};

export default Plot;
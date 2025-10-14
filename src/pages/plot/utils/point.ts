export type PointBase = {
  x: number;
  y:number;
  name:string;
}

class Point {
    x:number;
    y:number;
    name:string;
    
    constructor(x: number,y:number,name:string) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

export function parsePoints(){
    const points =  [];
    let header;
    for (let key of Object.keys(localStorage))
        {
            header = JSON.parse(localStorage.getItem(key));
            // console.log(header)
            const x = Number(header['E Coordinate']);
            const y = Number(header['N Coordinate']);
            const point = new Point(x,y, key);
            points.push(point);
            // console.log(point.x,point.y)
        }
    
    return points;
    
}


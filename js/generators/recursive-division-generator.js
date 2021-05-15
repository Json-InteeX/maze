import { drawLine } from "../sceen.js";
import {  sleep } from "../utils/helpers.js";

/**
 * 
 */
export class RecursiveDivision {

    constructor(rows, cols, xStart, yStart, xEnd, yEnd) {
        this.rows = rows;
        this.cols = cols;
        this.xStart = xStart;
        this.yStart = yStart;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }



    generate = async () => {
        recursiveDivision(0, 0, this.cols, this.rows)
    }
}
var count = 1

// const recursiveDivision = async (xMin, yMin, xMax, yMax) => {
//     count++;
//     if (count >= 100) return;
//     if (xMin === xMax || yMin == yMax) return;
//     //   first step determine the direction of the slice
//     const length = xMax - xMin;
//     const widht = yMax - yMin;
//     const vertical = length > widht
//     // choose random cell from random chmabre
//     let xMaxTmp = xMax;
//     let yMaxTmp = yMax;
//     vertical ? xMaxTmp = xMax - 1 : yMaxTmp = yMax - 1;
//     const x = Math.floor(Math.random() * (xMaxTmp - xMin) + xMin);
//     const y = Math.floor(Math.random() * (yMaxTmp - yMin) + yMin);
//     // slice the chamber 
//     if (vertical) {
//         drawLine(xMin, xMax, { x: x, y: y }, true)
//     } else drawLine(yMin, yMax, { x: x, y: y }, false)
//     //recursive call
//     if (vertical) {
//         await sleep(1000)
//         console.log({ xMin, yMin, x, yMax },  { x: x, y: y });
//         recursiveDivision(xMin, yMin, x, yMax);
//         await sleep(1000)
//         console.log({ x: x + 1, yMin, xMax, yMax },  { x: x, y: y });
//         recursiveDivision(x + 1, yMin, xMax, yMax);
//     } else {
//         await sleep(1000)
//         console.log({ xMin, yMin, xMax, y },  { x: x, y: y });
//         recursiveDivision(xMin, yMin, xMax, y);
//         await sleep(1000)
//         console.log({ xMin, y: y + 1, xMax, yMax },  { x: x, y: y });
//         recursiveDivision(xMin, y + 1, xMax, yMax);

//     }


// }


const recursiveDivision = async (xMin, yMin, xMax, yMax) => {
    
    //convert cell cordenates to rooms coordonates
    let rooms = [{ xMin: xMin, yMin: yMin, xMax: xMax, yMax: yMax }]

    let alternate_direction = false;

    while (rooms.length > 0) {
        await sleep(0)
        /**
         * object destruction in js see 
         * @see https://www.codegrepper.com/code-examples/javascript/mdn+object+destructuring
         */
        const { xMin, yMin, xMax, yMax } = rooms.shift();


        //if the room is a lane dont cut it
        if (xMax - xMin == 1 || yMax - yMin == 1) continue;

        // choose direction where to cut
        let isVertical;

        if((xMax - xMin) == (yMax - yMin)){
            isVertical = alternate_direction
            alternate_direction = !alternate_direction
        }else{
            isVertical = (xMax - xMin) > (yMax - yMin) ? true : false;

        }

        let room1, room2, from, to, x, y;

        if (isVertical) {
            // perform the cut
            const xRange = xMax - xMin - 2
            const xOffset = xMin + 1
            const yRange = yMax - yMin - 1
            const yOffset = yMin

            x = Math.floor(Math.random() * xRange + xOffset);
            //x = Math.floor(xRange /2 + xOffset);
            y = Math.floor(Math.random() * yRange + yOffset);

            room1 = { xMin, yMin, xMax: x, yMax }
            room2 = { xMin: x, yMin, xMax, yMax }
            from = yMin; to = yMax;
        } else {// is horisontal
            // perform the cut
            const xRange = xMax - xMin - 1
            const xOffset = xMin
            const yRange = yMax - yMin - 2
            const yOffset = yMin + 1

            x = Math.floor(Math.random() * xRange + xOffset);
            y = Math.floor(Math.random() * yRange + yOffset);
            //y = Math.floor(yRange/2 + yOffset);

            room1 = { xMin, yMin, xMax, yMax: y }
            room2 = { xMin, yMin: y, xMax, yMax }
            from = xMin; to = xMax;
        }


        rooms.push(room1)
        rooms.push(room2)
        console.log({ room1, room2 })
        console.log({ x, y })
        drawLine(from, to, { x: x, y: y }, isVertical);


    }

}


import React, { Component } from "react";
import { Life } from '../models/life';

interface Props {
    start: boolean;
    reset: boolean;
    doStop: () => void;
    doneReset: () => void;
}

interface State {
    life: Life,
    grid: number[][],
}

export class Grid extends Component 
<
    Props,
    State
> 
{
    state = {
        life: new Life(15, 15),
        grid: [] as number[][], // without the as, an empty array will come up as "never" (?)
    }
    
    componentDidMount() {
        this.drawGrid(this.state.life.currentStep());
    }

    componentDidUpdate() {
        this.resetGrid();
        this.gameLoop();
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    gameLoop = async () => {
        while (this.props.start) {
            await this.sleep(100);
            this.drawGrid(this.state.life.nextStep());
        }
    }

    // from How to get the context X and Y position within a canvas html5 
    // https://stackoverflow.com/a/18862165
    getMousePos = (canvas: any, e: React.MouseEvent) => {
        /// getBoundingClientRect is supported in most browsers and gives you
        /// the absolute geometry of an element
        const rect = canvas.getBoundingClientRect();
        /// as mouse event coords are relative to document you need to
        /// subtract the element's left and top position:
        return {x: e.clientX - rect.left, y: e.clientY - rect.top};
    }

    resetGrid = () => {
        // this.setState({ grid: this.state.life.clearGens() });
        if (this.props.reset) {
            this.props.doStop();
            this.drawGrid(this.state.life.clearGens());
            this.props.doneReset();
        }
    }
    
    modifyGrid = (e: React.MouseEvent) => {
        // No modifying if it's running
        if (this.props.start) return;
        // Initialize canvas
        const canvas: any = this.refs.canvas,
              ctx = canvas.getContext("2d");

        const pos = this.getMousePos(canvas, e),
              x = Math.floor(pos.x / 30),
              y = Math.floor(pos.y / 30);
        
        let modifiedGrid: number[][] = JSON.parse(JSON.stringify(this.state.life.currentStep()));
        // Draw rectangle onto grid
        ctx.fillStyle = modifiedGrid[y][x] ? 'white' : 'gray';
        ctx.fillRect(x * 30, y * 30, 30, 30);
        ctx.strokeRect(x * 30, y * 30, 30, 30);
        // Toggle status in Life grid
        modifiedGrid[y][x] = Number(!modifiedGrid[y][x]);
        this.state.life.updateGen(modifiedGrid);
    }

    drawGrid = (grid: number[][]) => {
        const canvas: any = this.refs.canvas,
              ctx = canvas.getContext("2d");
        
        for (const [y, row] of grid.entries()) {
            for (const [x, cell] of row.entries()) {
                // Draw Each Cell
                // const drawRect = cell ? ctx.fillRect.bind(ctx) : ctx.strokeRect.bind(ctx);
                // drawRect(x * 30, y * 30, 30, 30);
                ctx.fillStyle = cell ? "gray" : "white";
                ctx.fillRect(x * 30, y * 30, 30, 30);
                ctx.strokeRect(x * 30, y * 30, 30, 30);
            }
        }
    }

    render() {
        return(
          <div>
            <canvas ref="canvas" onClick={this.modifyGrid} width={450} height={450} />
          </div>
        )
      }
}

/*
Resources used:
Using HTML5 Canvas with React
https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76

    function cb() {
        const canvas: any = useRef(null);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 150, 100);
    }
*/

// import React, { useEffect, useRef } from 'react';

// export function Grid () {
//     const canvas: any = useRef(null);

//     useEffect(() => {
//         const grid = [...Array(15)].map(e => Array(15).fill(0));
//         // Delete this later
//         grid[3][3] = 1;
//         grid[8][8] = 1;
//         // End Delete
//         const ctx = canvas.current.getContext('2d');

//         for (const [y, row] of grid.entries()) {
//             for (const [x, cell] of row.entries()) {

//                 // Draw Each Cell
//                 let drawRect = cell ? ctx.fillRect.bind(ctx) : ctx.strokeRect.bind(ctx);
//                 drawRect(x * 30, y * 30, 30, 30)
//             }
//         }
//     });

//     return (
//         <div>
//           <canvas ref="canvas" width={800} height={800} />
//         </div>
//     );
// }
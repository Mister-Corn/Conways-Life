import React, { Component } from "react";

interface State {
    grid: number[][],
    isClickable: boolean 
}

export class Grid extends Component 
<
    {}, // prop type declarations
    State
> 
{
    state = {
        grid: [...Array(15)].map(e => Array(15).fill(0)),
        isClickable: true
    }
    
    componentDidMount() {
        const canvas: any = this.refs.canvas;
        this.drawGrid(canvas);
        canvas.addEventListener('click', 
            (e: React.MouseEvent) => this.modifyGrid(canvas, e), 
            false
        );
    }

    componentWillUnmount() {
        const canvas: any = this.refs.canvas;
        canvas.removeEventListener('click', 
            (e: React.MouseEvent) => this.modifyGrid(canvas, e),
            false
        );
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
        this.setState({ grid: [...Array(15)].map(e => Array(15).fill(0)) });
    }
    
    modifyGrid = (canvas: any, e: React.MouseEvent) => {
        const pos = this.getMousePos(canvas, e),
              x = Math.floor(pos.x / 30),
              y = Math.floor(pos.y / 30);
        
        let modifiedGrid = JSON.parse(JSON.stringify(this.state.grid));
        modifiedGrid[y][x] = modifiedGrid[y][x] ? 0 : 1;
        console.log("modified grid:", modifiedGrid);
        this.setState({ grid: modifiedGrid }, () => console.log("new state:",
            this.state.grid));
        // this.setState((state: State) => {
        //     return {
        //         ...state,
        //         grid: 
        //     }
        // } )
        this.drawGrid(canvas);
    }

    drawGrid = (canvas: any) => {
        const grid = this.state.grid;
        const ctx = canvas.getContext("2d");
        
        for (const [y, row] of grid.entries()) {
            for (const [x, cell] of row.entries()) {
                // Draw Each Cell
                ctx.fillStyle = 'gray';
                let drawRect = cell ? ctx.fillRect.bind(ctx) : ctx.strokeRect.bind(ctx);
                drawRect(x * 30, y * 30, 30, 30);
            }
        }
    }

    toggleRectCell = (canvas: any, cell: number) => {

    }

    render() {
        return(
          <div>
            <canvas ref="canvas" width={800} height={800} />
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
//         const ctx = canvas.getContext('2d');

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
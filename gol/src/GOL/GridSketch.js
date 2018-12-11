import GridConstants from './GridConstants';
import Cell from './Cell';
/**
 * Palette:
lite gray: #a8a7a8
matte pink: #cc527a
brite pink: #e8175d
med gray: #474747
dark gray: #363636
 */

function sketch (p){

  const cols = GridConstants.num_cols;
  const rows = GridConstants.num_rows;
  const w = GridConstants.cell_w;
  const h = GridConstants.cell_h;
  let parentW = document.querySelector(".sketch-container").clientWidth;
  let parentH = document.querySelector(".sketch-container").clientHeight;
  let gridArr = [[]];

  p.preload = () => {};

  const createCells = () => {
    
    for (let i=0; i<cols; i++){
        gridArr[i] = [];
        for(let j=0; j<rows; j++){
          gridArr[i][j] = new Cell();
        }
    }
    console.log("GRIDARR >>> ", gridArr);
  };
  
  p.setup = () => {
    p.pixelDensity(1);
    p.createCanvas(parentW,parentH);
    console.log(new Cell());
    
    createCells();
  };

  p.draw = () => {
    p.background("#e8175d");
    for(let i=0; i<cols; i++){
      for(let j=0; j<rows; j++){
        p.noStroke();
        p.rect(i*w, j*w, w-1, h-1);
        p.fill("#cc527a");
      }
    }
  };

}

export default sketch;

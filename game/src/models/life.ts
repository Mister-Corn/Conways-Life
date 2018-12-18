export class Life {
    // Property type declarations
    private height: number;
    private width: number;
    private genA: number[][];
    private genB: number[][];
    private current: boolean; // T: genA, F: genB

    constructor(height: number, width: number) {
        /*
        Initializes both gen arrays and sets initial current
        */
       this.height = height;
       this.width = width;
       this.genA = [...Array(height)].map(e => Array(width).fill(0));
       this.genB = [...Array(height)].map(e => Array(width).fill(0));
       this.current = true;
    }

    public currentStep(): number[][] {
        return this.current ? this.genA : this.genB;
    }

    public updateGen(input: number[][]): number[][] {
        /*
        Updates the current gen with number[][] input
        Returns the input
        */
        if (this.current) { this.genA = input; }
        else              { this.genB = input; }
        return this.currentStep();
    }
    public clearGens(): number[][] {
        /*
        Resets genA, genB, and current.
        Returns genA, the generation a newly initialized Life instance
        starts at
        */
        this.genA = [...Array(this.height)].map(e => Array(this.width).fill(0));
        this.genB = [...Array(this.height)].map(e => Array(this.width).fill(0));
        this.current = true;
        return this.genA;
    }

    private getValueFromGen(arr: number[][], x: number, y: number): number {
        if (y < 0 || y >= this.height) { return 0; }
        if (x < 0 || x >= this.width)  { return 0; }
        return arr[y][x];
    }

    public nextStep(): number[][] {
        const thisGen = this.current ? this.genA : this.genB,
              thatGen = this.current ? this.genB : this.genA;
     

        for (const [y, row] of thisGen.entries()) {
            for (const [x, cell] of row.entries()) {
                // Identify neighbors and find how many are alive
                // Remember y _increases_ as we go down. 
                let alive: number = 0;
                alive += this.getValueFromGen(thisGen, x    , y - 1);
                alive += this.getValueFromGen(thisGen, x + 1, y - 1);
                alive += this.getValueFromGen(thisGen, x + 1, y    );
                alive += this.getValueFromGen(thisGen, x + 1, y + 1);
                alive += this.getValueFromGen(thisGen, x    , y + 1);
                alive += this.getValueFromGen(thisGen, x - 1, y + 1);
                alive += this.getValueFromGen(thisGen, x - 1, y    );
                alive += this.getValueFromGen(thisGen, x - 1, y - 1);
                
                // Apply rules to considered cell
                if (cell) {
                    // If cell is alive, it remains alive if there are two or three alive neighbors
                    thatGen[y][x] = alive === 2 || alive === 3 ? 1 : 0;
                }
                else {
                    // If cell is not alive, it will be alive again if it has three alive neighbors
                    thatGen[y][x] = alive === 3 ? 1 : 0;
                }
            }
        }

        this.current = !this.current;
        
        return thatGen;
    }
}


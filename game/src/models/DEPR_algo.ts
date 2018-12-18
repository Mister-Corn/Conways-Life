// Quickly initializing 2-D Array
// const myGrid = [...Array(15)].map(e => Array(15));

// Create Two 2-D arrays 
// const gridA = [...Array(15)].map(e => Array(15).fill(0));
// const gridB = [...Array(15)].map(e => Array(15).fill(0));

export const iterate = function iterateGridAndApplyRules(input: number[][]): number[][] {
    const outputArray = [...Array(15)].map(e => Array(15).fill(0));

    for (const [y, row] of input.entries()) {
        for (const [x, cell] of row.entries()) {
            // Identify neighbors
            // Remember y _increases_ as we go down. 
            let live: number = 0;
            live += input[y - 1][x];
            live += input[y - 1][x + 1];
            live += input[y][x + 1];
            live += input[y + 1][x + 1];
            live += input[y + 1][x];
            live += input[y + 1][x - 1];
            live += input[y][x - 1];
            live += input[y - 1][x - 1];
            
            // Apply Rules
            if (cell) {
                // If cell is live, it remains live if there are two or three live neighbors
                outputArray[y][x] = live === 2 || live === 3 ? 1 : 0;
            }
            else {
                // If cell is not alive, it will be live again if it has three live neighbors
                outputArray[y][x] = live === 3 ? 1 : 0;
            }
        }
    }

    return outputArray;
}

/*
General approach:
* Create two arrays for double buffer. Both arrays will be 2-D (nested) arrays.

In iterate function:
* Create an answer array
* Iterate through the working array. 
* For each cell in the working array, apply rules to a brand new array
    (Don't mutate the original array)

    Rules:

    * If the cell is alive **and** has 2 or 3 neighbors, then it remains. Else it dies.
        (Under/Over population)
    * If the cell is dead **and** has exactly three neighbors, then it comes to life. (Reproduction)
*/
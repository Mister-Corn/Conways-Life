# Game of Life - Analysis

## What is the Game of Life?

The game of life is an example of cellular automata. 

"Complexity can arise from just a simple set of rules". Conway's Game of Life illustrates this.

### Turing Complete?

It was postulated that certain structures in the game of life could continually produce other structures. From limited state can arise limitless possibilities. From that, the Game of Life could be _Turing Complete_, as in capable of doing general purpose computation. The limitless possibilities was confirmed in the 1970 with a creation of a gun structure that fired mini structures endlessly. It was also shown that NAND gate structures could be implemented, allowing general purpose computing (as NAND gates can be used to build gates of other types).

TODO: Study the logical links. Why is the idea of limitless possibilities lead to the notion of Turing-Completeness?


## What are the Rules of the Game of Life?

We will look at each cell in the grid. For each cell, we will consider itself and its eight neighbors, cardinals and diagonals. The state of the cell and its neighbors will change based on the following rules.

* If the cell is alive **and** has 2 or 3 neighbors, then it remains. Else it dies.
(Under/Over population)
* If the cell is dead **and** has exactly three neighbors, then it comes to life. (Reproduction)

# Game of Life - Implementation

* Nested arrays are used to represent 2-D arrays


import {input} from "./input.js";

class Couple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//receive 2d array and logs as single string
function print(a) {
    console.log(a.map(row => row.join('')).join('\n') + '\n');
}

let grid = input.split('\n').map(x => x.split(''));
let width = grid[0].length - 1;
let height = grid.length - 1;
//init rank 2d array filled with 0
let rank = new Array(height).fill(0).map(() => new Array(width).fill(0));

console.log(width, height);
// print(grid);
// print(rank);
// console.log(grid);

var result = 0;

let queue = [];

//iterate grid and if value == 'a' then add to queue
for (let j = 0; j < grid.length; j++) {
    for (let k = 0; k < grid[j].length; k++) {
        if (grid[j][k] === 'a') {
            rank[j][k] = 1;
            queue.push(new Couple(k, j));
        }
    }
}
console.log(queue.length);
function evaluateHorizontal(horizontalIndex, current, currentRank, currentValue) {
    if (horizontalIndex >= 0 && horizontalIndex < width) {
        if (rank[current.y][horizontalIndex]) return;
        const target = grid[current.y][horizontalIndex];
        if (target === 'E') {
            result = currentRank + 1;
            return console.log('found E', result + 1);
        }
        const targetValue = target.charCodeAt(0);

        if (targetValue <= currentValue + 1) {
            rank[current.y][horizontalIndex] = currentRank + 1;
            queue.push(new Couple(horizontalIndex, current.y));
        }
    }
}

function evaluateVertical(verticalIndex, current, currentRank, currentValue) {
    if (verticalIndex >= 0 && verticalIndex < height) {
        if (rank[verticalIndex][current.x]) return;
        // console.log(verticalIndex, current.x, grid[verticalIndex][current.x]);
        const target = grid[verticalIndex][current.x];
        if (target === 'E') {
            result = currentRank + 1;
            return console.log('found E', result + 1);
        }
        const targetValue = target.charCodeAt(0);

        if (targetValue <= currentValue + 1) {
            rank[verticalIndex][current.x] = currentRank + 1;
            queue.push(new Couple(current.x, verticalIndex));
        }
    }
}
let i = 0;
print(grid)
while (queue.length) {
    let current = queue.shift();
    // console.log(current)
    let currentValue = grid[current.y][current.x].charCodeAt(0);
    let currentRank = rank[current.y][current.x];
    // console.log(currentValue, currentRank);
    
    let leftIndex = current.x - 1;
    let rightIndex = current.x + 1;
    let downIndex = current.y + 1;
    let upIndex = current.y - 1;

    evaluateHorizontal(leftIndex, current, currentRank, currentValue);
    evaluateHorizontal(rightIndex, current, currentRank, currentValue);
    evaluateVertical(downIndex, current, currentRank, currentValue);
    evaluateVertical(upIndex, current, currentRank, currentValue);
    i++;
    // if (i % 10 === 0) {
    //     debugger;
    // }
}

// 413 too low : 426 too high

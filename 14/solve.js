import {input} from './input.js';
import {example} from './input.js';

// const parsedInput = example.split('\n').map(line => line.split(' -> ').map(coordinate => [...coordinate.split(',').map(Number)]));
const parsedInput = input.split('\n').map(line => line.split(' -> ').map(coordinate => [...coordinate.split(',').map(Number)]));


const width = 550;
const height = 200;

var grid = new Array(height).fill(0).map(() => new Array(width).fill('.'));

function print(a) {
    const p = [];
    a.forEach(row => {
        p.push(row.slice(450).join(''))
    })
    console.log(p.join('\n') + '\n');
}

function getPoint(x, y) {
    // console.log('getPoint', x, y, grid[y][x]);
    return grid[y][x];
}

function setPoint(x, y, value) {
    grid[y][x] = value;
}

function drawLine(x1, y1, x2, y2) {
    const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    // console.log([x1, y1], [x2, y2], length);
    for (let i = 0; i <= length; i++) {
        const x = Math.round(x1 + (x2 - x1) * i / length);
        const y = Math.round(y1 + (y2 - y1) * i / length);
        setPoint(x, y, '#');
    }
}

parsedInput.forEach(pline => {
    for (let i = 0; i < pline.length; i++) {
        const point1 = pline[i];
        const point2 = pline[i + 1];
        if (point2 === undefined) break;
        drawLine(...point1, ...point2);
    }
})


const source = [500, 0];
setPoint(...source, '+');

print(grid);

function getNextCellToFlow(currentX, currentY) {
    const nextCells = [
        [currentX, currentY + 1],
        [currentX - 1, currentY + 1],
        [currentX + 1, currentY + 1],
    ];

    for (const [x, y] of nextCells) {
        if (getPoint(x, y) === '.') {
            // console.log('flowing to', x, y);
            return [x, y];
        }
    }
    return null;
}

let point = source;

while (true) {
    const nextPoint = getNextCellToFlow(...point);
    if (nextPoint === null) {
        setPoint(...point, 'O');
        point = source;
        // console.log('back to source');
        continue;
    }
    point = nextPoint;
    // console.log('setting new point', point)
    if (nextPoint[1] === height - 1) {
        break;
    }
}

print(grid);

let count = 0;
//iterate over grid
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (getPoint(x, y) === 'O') {
            count++;
        }
    }
}
console.log(count);

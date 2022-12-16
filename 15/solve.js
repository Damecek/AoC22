import {input} from './input.js'
import {example} from "./input.js";

let sensors = [];
let beacons = [];
input.split('\n').forEach(line => {
    let [sensorStr, beaconStr] = line.split(': closest beacon is at ');
    let [xS, yS] = sensorStr.match(/-?\d+/g).map(Number);
    let [xB, yB] = beaconStr.match(/-?\d+/g).map(Number);
    sensors.push({x: xS, y: yS});
    beacons.push({x: xB, y: yB});
});

console.log('sensors ', sensors.length);
console.log('beacons ', beacons.length);

const MIN_X = -6455040;
const MAX_X = 3983949 + 108500 * 2;
// const MAX_Y = 4169166;
// const MIN_Y = 5850 - 5850;
//
const WIDTH = MAX_X - MIN_X;
console.log('WIDTH', WIDTH);

function stat() {
    const stat = {
        '.': 0,
        '#': 0,
        'B': 0,
    }
    _2M.forEach(cell => {
        stat[cell]++;
    })
    console.log(stat);
}

var _2M = new Array(WIDTH).fill('.');

function setPoint(x, value) {
    _2M[x - MIN_X] = value;
}

function getPoint(x) {
    return _2M[x - MIN_X];
}

// const LINE = 10;
const LINE = 2000000;
function getValue(x, y) {
    // iterate beacons if x,y are equal to beacon, return B
    for (let i = 0; i < beacons.length; i++) {
        const beacon = beacons[i];
        if (beacon.x === x && beacon.y === y) {
            return 'B';
        }
    }
    return '#';
}

for (let i = 0; i < sensors.length; i++) {
    let sensor = sensors[i];
    let beacon = beacons[i];
    let distance = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    const distanceTo2M = Math.abs(LINE - sensor.y);
    if (distanceTo2M > distance) {
        // sensors.splice(i, 1);
        // beacons.splice(i, 1);
    } else {
        const over = distance - distanceTo2M;
        for (let j = 0; j <= over; j++) {
            const valueR = getValue(sensor.x + j, LINE);
            const valueL = getValue(sensor.x - j, LINE);
            setPoint(sensor.x + j, valueR);
            setPoint(sensor.x - j, valueL);
        }
        console.log('sensor', sensor, 'beacon', beacon);
        stat();
        // console.log(_2M.slice(6455030, 6455070).join(''));
    }
}

console.log('sensors ', sensors.length);
console.log('beacons ', beacons.length);

console.log(getPoint(MIN_X), _2M[MAX_X])

// get min and max index of # in _2M
let minIndex = WIDTH;
let maxIndex = 0;
for (let i = 0; i < _2M.length; i++) {
    if (_2M[i] === '#') {
        minIndex = Math.min(minIndex, i);
        maxIndex = Math.max(maxIndex, i);
    }
}

console.log(minIndex, maxIndex);

// log sublist fro minINdex to maIndex of _2m

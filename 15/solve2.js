import {input} from './input.js'
import {example} from "./input.js";


function menhattonDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

var parsedInputs = [];
var potentialBeacons = [];
const M4 = 4000000;

function getBorder(x, y, distance) {
    for (let i = 0; i < distance; i++) {
        potentialBeacons.push({x: x + i, y: y + distance - i});
        potentialBeacons.push({x: x + distance - i, y: y + i});
        potentialBeacons.push({x: x + i, y: y + i - distance});
        potentialBeacons.push({x: x + i - distance, y: y + i});
    }
}

console.time('parse')
input.split('\n').forEach(line => {
    let [sensorStr, beaconStr] = line.split(': closest beacon is at ');
    let [xS, yS] = sensorStr.match(/-?\d+/g).map(Number);
    let [xB, yB] = beaconStr.match(/-?\d+/g).map(Number);
    let distance = menhattonDistance(xS, yS, xB, yB);
    parsedInputs.push({
        sensor: {x: xS, y: yS},
        beacon: {x: xB, y: yB},
        distance
    });
    getBorder(xS, yS, distance + 1)
});

console.timeEnd('parse')

// console.log(parsedInputs);
console.log(potentialBeacons.length);
potentialBeacons.forEach(potentialBeacon => {
    if (potentialBeacon.x >= 0 && potentialBeacon.y >= 0 && potentialBeacon.x <= M4 && potentialBeacon.y <= M4) {
        let isBeacon = true;
        // console.log('new beacon', potentialBeacon);
        for (let i = 0; i < parsedInputs.length; i++) {
            const input = parsedInputs[i];
            const distanceToSensor = menhattonDistance(potentialBeacon.x, potentialBeacon.y, input.sensor.x, input.sensor.y);
            const searchDistance = input.distance;
            isBeacon &= searchDistance < distanceToSensor;
            // console.log(`distance between sensor ${input.sensor.x}, ${input.sensor.y} and beacon ${potentialBeacon.x}, ${potentialBeacon.y} is ${distanceToSensor}, search distance is ${searchDistance}, isBeacon is ${isBeacon}`);
            if (!isBeacon) break;
        }
        if (isBeacon) {
            console.log('found beacon', potentialBeacon, potentialBeacon.x * M4 + potentialBeacon.y);
            asd.jol;
        }
    }
})

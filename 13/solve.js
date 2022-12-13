import {input} from "./input.js";
import {example} from "./input.js";

// let a = example.split('\n');
let a = input.split('\n');

let packets = [];
a.forEach(line => {
    if (line !== '') {
        packets.push(eval(line));
    }
})


function compare(left, right) {
    const leftType = typeof left;
    const rightType = typeof right;
    // console.log('comparing:', leftType, left, rightType, right);
    if (leftType === 'number' && rightType === 'number') {
        if (left === right) {
            // console.log('numbers are equal', 0);
            return 0;
        }
        // console.log('both numbers', left < right)
        return right - left;
    }
    if (leftType === 'number' && Array.isArray(right)) {
        left = [left];
        // console.log('converting to list', left);
    }
    if (Array.isArray(left) && rightType === 'number') {
        right = [right];
        // console.log('converting to list', right);
    }
    if (Array.isArray(left) && Array.isArray(right)) {
        const maxLength = Math.max(left.length, right.length);
        // console.log('both lists', left, right);
        let isRight = 0;
        for (let i = 0; i < maxLength; i++) {
            if (left[i] === undefined) {
                // console.log('left is shorter', true);
                return 1;
            }
            if (right[i] === undefined) {
                // console.log('right is shorter', false);
                return -1;
            }
            const value = compare(left[i], right[i]);
            if (value !== 0) {
                isRight = value;
                break;
            }
        }
        // console.log('comparing lists', isRight);
        return isRight;
    }
}

let count = 1;
// for (let i = 0; i < packets.length / 2; i++) {
//     const packetIndex = i * 2;
//     const packet1 = packets[packetIndex];
//     const packet2 = packets[packetIndex + 1];
//
//     const isRight = compare(packet1, packet2);
//     if (isRight) {
//         count += i + 1;
//         console.log('count', count);
//     }
// }
packets.push([[2]]);
packets.push([[6]]);
packets.sort(compare);
packets.reverse();
packets.forEach(packet => {
    console.log(JSON.stringify(packet));
    if (compare(packet, [[2]]) === 0 || compare(packet, [[6]]) === 0) {
        count *= (packets.indexOf(packet) + 1);
    }
})

console.log(count);
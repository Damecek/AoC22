const M = 4000000;

let grid = [];
for (let i = 0; i < M; i++) {
    let a = []
    for (let j = 0; j < M; j++) {
        a.push(0);
    }
    grid.push(a);
    console.log(i)
}

console.log('finished')
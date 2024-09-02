const arr = [11,22,33,44,55];

const forEachReturn = arr.forEach(function (value, key, object){ // 매개변수 1개 : value, 2개 : value, key(순서도 그대로), 3개 : value, key, 배열 전체
    console.log(`value : ${value}, key : ${key}, object : ${object} `);
    return value * 2;
})

const mapReturn = arr.map(function (value, key, object){ 
    console.log(`value : ${value}, key : ${key}, object : ${object} `);
    return value * 2;
})

console.log(`foreach : ${forEachReturn} , map : ${mapReturn}, arr : ${arr}`);
// foreach : undefined , map : 22,44,66,88,110, arr : 11,22,33,44,55

let map = new Map();
map.set(7, "칠");
map.set(8, "팔");
map.set(9, "구");
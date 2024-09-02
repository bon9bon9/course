const arr = ["첫","둘","셋","넷","다섯"];

arr.forEach(function (value, key){ // 매개변수 1개 : value, 2개 : value, key(순서도 그대로), 3개 : value, key, 배열 전체
    console.log(value, key);
})

let map = new Map();
map.set(7, "칠");
map.set(8, "팔");
map.set(9, "구");
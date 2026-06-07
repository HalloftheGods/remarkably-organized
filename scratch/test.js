const arr = new Array(5);
let count = 0;
for (const x of arr) { count++; }
console.log("for-of count:", count);
count = 0;
arr.forEach(() => count++);
console.log("forEach count:", count);
console.log("keys length:", Object.keys(arr).length);

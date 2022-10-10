'use strict'
// .map

if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callback) {
        if (!(this instanceof Array || this instanceof String)) {
            throw new Error('Called on wrong type')
        }
        if (typeof callback !== 'function') {
            throw new Error(`${callback} is not a function`)
        }
        const arr = [];
        for (let i = 0; i < this.length; i++) {
            arr.push(callback(this[i], i, this));
        }
        return arr; 
    }
}

function mapFunction(array, callback) {
    if (!(array instanceof Array || array instanceof String)) {
        throw new Error('Called on wrong type');
    }
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`);
    }

    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(callback(array[i], i, array))
    }
    return newArray;
}

// console.log(mapFunction([1,2,3], ((item) => {return item * 2})))

// .filter
if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function(callback) {
        if (!(this instanceof Array || this instanceof String)) {
            throw new Error('Called on wrong type')
        }
        if (typeof callback !== 'function') {
            throw new Error(`${callback} is not a function`)
        }
    
        const filterArray = [];
        for(let i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                filterArray.push(this[i]);
            }
        }
        return filterArray;
    }
}

function filterFunction(array, callback) {
    if (!(array instanceof Array || array instanceof String)) {
        throw new Error('Called on wrong type');
    }
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`);
    }
    const filterArray = [];
    for(let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            filterArray.push(array[i]);
        }
    }
    return filterArray;
}

// console.log(...filterFunction([1,2,3,4,10], ((item) => {return item % 2 === 0})))

// .call

if (!Function.prototype.myCall) {
    Function.prototype.myCall = function(context, ...args) {
        context.func = this;
        return context.func(...args);
    }
}

Function.prototype.ucall = function(context, ...args) {
    context.this = this;
    context.this(args)
    delete contex.this
}
let contex = {
    'here is': 'context'
}
function funcWithoutContext() {
    console.log(this)
}
funcWithoutContext.ucall(contex)

// .flat
if (!Array.prototype.uflat) {
    Array.prototype.uflat = function func(deep = 1) {
        if (!(this instanceof Array)) {
            throw new Error('eto ne array')
        }
        if (typeof deep !== 'number') {
            throw new Error(`${deep} is not a number`)
        }

        let deepArr = [];
    
        deep--
    
        for (let i = 0; i < this.length; i++) {
            if (this[i] instanceof Array && deep >= 0) {
                deepArr.push(...this[i].uflat(deep))
            }
            else {
                deepArr.push(this[i])
            }
        }
        
        return deepArr;
    
        // (function flatter(arr) {
        //     for (let i = 0; i < arr.length; i++) {
        //         if (arr[i] instanceof Array && deep >= 0) {
        //             deep--
        //             flatter(arr[i])
        //         } else {
        //             deepArr.push(arr[i])
        //         }
        //     }
        // })(this)
    
        // return deepArr;
    }
}

const fobo = [1, [[1, 2], 3], 5, [8, 13], 21]

// console.log(fobo.uflat(1))
if (!Array.prototype.myFlat) {
    Array.prototype.myFlat = function(deep) {
        if (!(this instanceof Array || this instanceof String)) {
            throw new Error('Called on wrong type')
        }
        if (typeof deep !== 'number') {
            throw new Error(`${deep} is not a number`)
        }

        const flatArr = [];
        function flatter(deep, result) {
            if (deep === -1) {
                flatArr.push(result)
                return;
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i] instanceof Array) flatter(deep - 1, result[i])
                else {flatArr.push(result[i])}
            } 
        }
        flatter(deep, this)
        return flatArr;
    }
}

function flatFunction(deep, array) {
    if (!(array instanceof Array || array instanceof String)) {
        throw new Error('Called on wrong type')
    }
    if (typeof deep !== 'number') {
        throw new Error(`${deep} is not a number`)
    }

    const flatArr = [];
    function flatter(deep, result) {
        if (deep === -1) {
            flatArr.push(result)
            return;
        }
        for (let i = 0; i < result.length; i++) {
            if (result[i] instanceof Array) flatter(deep - 1, result[i])
            else {flatArr.push(result[i])}
        } 
    }
    flatter(deep, array)
    return flatArr;
}

// console.log(flatFunction(0, [[[1]],2,3]))

// .reduce

if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function(cb = (item) => {return item}, init) {
        if (!(this instanceof Array || this instanceof String)) {
            throw new Error('Called on wrong type')
        }

        let iterator = 0
        let acc
    
        if(!init) {
            init = this[0]
            iterator = 1
        }
    
        acc = init
    
        for (iterator; iterator < this.length; iterator++) {
            acc = cb(acc, this[iterator])
        }
    
        return acc;
    }
}

// .apply

// .promise

function PromisePolifill(executor) {
    let onResolve;
    let fulfilled = false;
    let called = false;
    let value;

    function resolve(val) {

        fulfilled = true;
        value = val;

        if (typeof onResolve === 'function') {
            onResolve(val);
            called = true;
        }
    };
    
    this.then = (cb) => {
        onResolve = cb;
        
        if (fulfilled && !called) {
            called = true;
            onResolve(value);
        }
        
        return this;
    };
    
    this.catch = function(cb) {
        return this;
    };
    
    executor(resolve);
}

let prom = new PromisePolifill((resolve) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", 'https://jsonplaceholder.typicode.com/todos/1')

    xhr.send()

    xhr.onload = function() {
        resolve(`Load: ${xhr.response}`);
    };
})
.then(val => val);


    let first = new Promise((resolve, reject) => {    let xhr = new XMLHttpRequest();
    
        xhr.open("GET", `https://jsonplaceholder.typicode.com/todos/${+(Math.random()*10 + 1).toFixed()}`)
    
        xhr.send()
    
        xhr.onload = function() {
            resolve(`Load: ${xhr.response}`);
        };});

    let second = new Promise((resolve, reject) => {    let xhr = new XMLHttpRequest();

        xhr.open("GET", `https://jsonplaceholder.typicode.com/todos/${+(Math.random()*10 + 1).toFixed()}`)
    
        xhr.send()
    
        xhr.onload = function() {
            resolve(`Load: ${xhr.response}`);
        };});

    let third = new Promise((resolve, reject) => {    let xhr = new XMLHttpRequest();

        xhr.open("GET", `https://jsonplaceholder.typicode.com/todos/${+(Math.random()*10 + 1).toFixed()}`)
    
        xhr.send()
    
        xhr.onload = function() {
            resolve(`Load: ${xhr.response}`);
        };});

    let fourth = new Promise((resolve, reject) => {    let xhr = new XMLHttpRequest();

        xhr.open("GET", `https://jsonplaceholder.typicode.com/todos/${+(Math.random()*10 + 1).toFixed()}`)
    
        xhr.send()
    
        xhr.onload = function() {
            resolve(`Load: ${xhr.response}`);
        };});


function promiseAll(promArr) {
    if (!promArr.length) {
        return new Promise((resolve) => {
            resolve([])
        })
    }
    return new Promise((resolve, reject) => {
        let resArr = []
        try {
            for (let i = 0; i < promArr.length; i++) {
                promArr[i].then(val => {resArr.push(val)
                if (resArr.length === promArr.length && !resArr.includes(undefined)) {
                    resolve(resArr)
                }
            })
            }
        } catch(err) {
            reject(err);
        }
    })
}
// promiseAll([first, second, third, fourth]).then(console.log).catch(console.log)

// fetch(`https://jsonplaceholder.typicode.com/todos/${+(Math.random()*10 + 1).toFixed()}`).then(data => data.json(data)).then(console.log)

const obj = {
    a: {
      b: {
        c: {
          d: "Привет!"
        }
      }
    }
  };
  
  function optionalChaining(o, path) {
        if (typeof path === 'string') path = path.split('.')
        let cur = path.shift()
        if (!o[cur]) return undefined
        if (!path.length) return o[cur]
        return optionalChaining(o[cur], path)
  }
  
//   console.log("1", optionalChaining(obj, "a.b.c")); // { d: 'Привет' }
//   console.log('2', optionalChaining(obj, "a.b.c.d")); // Привет
//   console.log('3', optionalChaining(obj, "a.b.c.d.e")); // undefined
//   console.log('4', optionalChaining(obj, "b.d.a")); // undefined
//   console.log('5',
//     optionalChaining(obj, "")
//   );

// f.call(null)

function f() {
    console.log(this)
}

let lettersArr = [3,4,10,4,8,7,3,3,4,9,8,2,9,6,2,8,4,9,9,10,2,4,9,10,8,2]
 
let chars = "mqblbtpvicqhbrejb"
  
  var numberOfLines = function(widths, s) {
    let lineCount = 0;
    let sum = 0
    let widthObj = {};

    let alph = "abcdefghijklmnopqrstuvwxyz".split('');

    alph.forEach((item, index) => {
      widthObj[item] = widths[index]
    })
    
    s.split('').forEach((item)=> {
      
    sum += widthObj[item]

    if (sum > 100) {
        lineCount +=1
        sum = widthObj[item]
      }
    })

    lineCount +=1
    
    let arr = []
    arr[0] = lineCount;
    arr[1] = sum
    return arr
};

// console.log(numberOfLines(lettersArr, chars))

// function FuncConstruct(outerValue = 0) {
//     this.outerValue = outerValue
//     let prop = 'construct'
//     this.showNewProp = () => {
//         console.log(this)
//     }
// }

// let testObj = {
//     prop: 'value',
//     deepProp: {
//         innerProp: 'innerValue',
//         deepDeep: {
//             deepProp: 'deepValue,'
//         },
//     },
//     showThis: () => {
//         console.log(this)
//     }
// }

// let secondObj = {
//     wololo: 'itrich',
// }

// let NewConstruct = new FuncConstruct('some value')
// // console.log(NewConstruct.prop)
// let createdObj = Object.create(NewConstruct)
// createdObj.created = 'created'
// let copyCat = {...testObj}
// let oKeys = Object.create(testObj, {
//     alice: { value: 18, enumerable: true }})
// console.log(oKeys.prop)
// console.log(testObj)
// console.log(copyCat)
// // NewConstruct.showNewProp()
// const map1 = new Map([['a', 1], ['b', 2]]);

// map1.forEach((key, val) => {
//     console.log(map1.get(val))
// })

function retutner(x) {
    return x;
}

function multiplexer() {
    
}

function bubble(arr) {
    let swap = false;
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        swap = false;
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let proxy = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = proxy;
                swap = true
            }
        }
        if (!swap) break;
    }
    return arr;
}

// console.log(bubble([3, 2, 4, 1, -11, 555]))

function sum(a) {
    // console.log(a)
    return (n) => sum(a + n)
}

// console.log(sum(1)(2)(3)(4))

const pipe = (...fns) => (x) => fns.reduce((acc, func) => func(acc), x) 

const multi = (prop) => prop * 3

const pulti = (prop) => prop + 'aaaaaaa'

// pipe(multi, pulti, console.log)(7)

// console.log('pf'.repeat(5))

let instance = null;
function User(name, age) {
  if(instance) {
    return instance;
  }
  instance = this;
  this.name = name;
  this.age = age;
  
  return instance;
}
const user1 = new User('Peter', 25);
const user2 = new User('Mark', 24);
// выводит true
// console.log(user1, user2);

class Vehicle {
    constructor(type, color) {
      this.type = type;
      this.color = color;
    }
    getSpecs() {
      return `Type: ${this.type}, Color: ${this.color}`;
    }
  };
var someTruck = new Vehicle('Truck', 'red');
// console.log(someTruck.__proto__.__proto__.__proto__)

const pipipe = (...fns) => (x) => fns.reduce((acc, func) => func(acc), x)

var Person = function (name) {
    this.name = name;
  }
  Person.prototype.greet = function () {
    // console.log(`Hello, my name is ${this.name}`);
  }
var uniqueBob = new Person('Bob');
uniqueBob.hobbies = ['Cooking', 'Running'];
uniqueBob.greet = function() {
  Person.prototype.greet.call(this);
  console.log('My hobbies are: ', this.hobbies);
};
// uniqueBob.greet();

// let arr = [3, 5, 1];


const btn = document.getElementById('button')
const body = document.getElementById('body')
body.addEventListener('click', function(e) {
    console.log(this)
}, true)
btn.addEventListener('click', function(e) {
    console.log(this)
}, true)


function isUnique(string) {
    return new Set(string).size !== string.length
}

// console.log(isUnique('abcadef')) // -> true
// console.log(isUnique('1234567')) // -> true
// console.log(isUnique('abcABC')) // -> true
// console.log(isUnique('abcadef')) // -> false

function flatten(array) {
    let proxy = []
    
    for (let i = 0; i < array.length; i++) {
        // console.log(array[i])
        if (Array.isArray(array[i])) {
            const flat = flatten(array[i])
            for (let j = 0; j < flat.length; j++) {
                proxy.push(flat[j])
            }
        } else {
            proxy.push(array[i])
        }
    }
    return proxy
    // return array.flat(Infinity).reduce((acc, item) => acc + item)
  }
  
//   console.log(flatten([[1], [[2, 3]], [[[4]]]])) // -> [1, 2, 3, 4]

function removeDupes(str) {
    // let proxy = [];
    // for (let i = 0; i < str.length; i++) {
    //     if (proxy.includes(str[i])) continue;
    //     proxy.push(str[i]);
    // }
    return Array.from(new Set(str)).join('');
}


// console.log(removeDupes('abcd')) // -> 'abcd'
// console.log(removeDupes('aabbccdd')) // -> 'abcd'
// console.log(removeDupes('abcddbca')) // -> 'abcd'
// console.log(removeDupes('abababcdcdcd')) // -> 'abcd'

function highestFrequency(array) {
    const proxy = array.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {})
    // console.log(proxy)
    let max = ['', 0]
    for (let key of Object.entries(proxy)) {
        // console.log(max)
        if (key[1] > max[1]) max = key
    }
    return max[0]
}

// console.log(highestFrequency(['a', 'b', 'c', 'c', 'd', 'e'])) // -> c
// console.log(highestFrequency(['abc', 'def', 'abc', 'def', 'abc'])) // -> abc
// console.log(highestFrequency(['abc', 'def'])) // -> abc
// console.log(highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ])) // -> ghi

function isStringRotated(source, test) {
    return new Set(source).size === new Set(test).size
  }
  
//   console.log(isStringRotated('javascript', 'scriptjava')) // -> true
//   console.log(isStringRotated('javascript', 'iptjavascr')) // -> true
//   console.log(isStringRotated('javascript', 'java')) // -> false

function arraySubset(source, subset) {
    if (source.length < subset.length) return false;
    for (let i = subset.length-1; i > - 1; i--) {
        if (source.includes(subset[i])) {
            delete source[subset[i]];
            subset.pop(subset[i]);
        }
    }
    return !subset.length;
  }
  
//   console.log(arraySubset([2, 1, 3], [1, 2, 3])) // -> true
//   console.log(arraySubset([2, 1, 1, 3], [1, 2, 3])) // -> true
//   console.log(arraySubset([1, 1, 1, 3], [1, 3, 3])) // -> false
//   console.log(arraySubset([1, 2], [1, 2, 3])) // -> false

function allAnagrams(array) {
    let proxy = array.map((item) => {
        return item.split('').sort().join('')
    })
    for (let i = 0; i < proxy.length - 1; i++) {
        if (proxy[i] !== proxy[i + 1]) return false;
    }
    console.log(proxy)
    return true;
  }
  
//   console.log(allAnagrams(['abcd', 'bdac', 'cabd'])) // true
//   console.log(allAnagrams(['abcd', 'bdXc', 'cabd'])) // false

function search(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) return i
    }
    
    return -1
}

// console.log(search([1, 3, 6, 13, 17], 13)) // -> 3
// console.log(search([1, 3, 6, 13, 17], 12)) // -> -1

function optimalSearch(array, target) {
    let start = 0;
    let end = array.length - 1;

    if (target < array[start] || target > array[end]) return -1


    while (true) {
        if (target === array[start]) return start;
        if (target === array[end]) return end;

        if (end - start <= 1) return -1;

        const middle = Math.floor((start + end) / 2);
        if (target > array[middle]) {
            start = middle + 1;
        } else if (target < array[middle]) {
            end = middle - 1;
        } else {
            return middle;
        }
    }
}

//   console.log(optimalSearch([1, 3, 6, 13, 17], 13)) // -> 3
//   console.log(optimalSearch([1, 3, 6, 13, 17], 12)) // -> -1
//   console.log(optimalSearch([1, 3, 6, 13, 17], 120)) // -> -1

function isBalanced(string) {
    const map = {
        ')': '(',
        ']': '[',
        '}': '{',
    }

    let proxy = [];
    const start = '([{';
    const end = ')]}';

    for (let i = 0; i < string.length; i++) {
        if (start.includes(string[i])) {
            proxy.push(string[i])
        } else if (end.includes(string[i])) {
            let deleted = proxy.pop()
            if (deleted !== map[string[i]]) return false
        }
    }
    return !proxy.length;
  }
  
//   console.log(isBalanced('(x + y) - (4)')) // -> true
//   console.log(isBalanced('(((10 ) ()) ((?)(:)))')) // -> true
//   console.log(isBalanced('[{()}]')) // -> true
//   console.log(isBalanced('(50)(')) // -> false
//   console.log(isBalanced('[{]}')) // -> false

function reverse(arr) {
    let proxy = [];
    for (let i = arr.length - 1; i > -1; i--) {
        proxy.push(arr[i])
    }
    return proxy
}

// console.log(reverse([1, 3, 6, 13, 17]))

class Queue {
    #storage = {}
    #start = 0
    #end = 0
    
    enqueue(item) {
        this.#storage[this.#end] = item
        this.#end++
    }
  
    dequeue() {
        if (this.size === 0) return
        const val = this.#storage[this.#start]
        delete this.#storage[this.#start]
        this.#start++
        return val
    }

    print() {
        console.log(this)
    }
  
    get size() {
        return this.#end - this.#start
    }
}

// let qu = new Queue([])
// qu.enqueue(3)
// console.log(qu)
// qu.enqueue(5)
// console.log(qu)
// qu.enqueue(7)
// console.log(qu)
// console.log(qu.dequeue())
// console.log(qu.size)
// qu.print()

function deepEqual(a, b) {
    if (Number.isNaN(a) && Number.isNaN(b)) return true
    
    if (typeof a !== 'object' || typeof b !== 'object' || a === null) return a === b

    if (Object.keys(a).length !== Object.keys(b).length) return false
    for ( let key of Object.keys(a)) {
        if (!deepEqual(a[key], b[key])) return false
    }

    return true
}
  
//   const source = {a: 1, b: {c: 1}}
//   const test1 = {a: 1, b: {c: 1}}
//   const test2 = {a: 1, b: {c: 2}}
//   console.log(deepEqual(source, test1)) // -> true
//   console.log(deepEqual(source, test2)) // -> false
//   console.log(deepEqual(NaN, NaN)) // -> true
//   console.log(deepEqual('test', 'test!')) // -> false
//   console.log(deepEqual()) // -> true

function fibonacci(n) {
    let fiboArr = [1, 1];
    for ( let i = 2; i < n; i++) {
        fiboArr.push(fiboArr[i - 1] + fiboArr[i - 2])
    }
    return fiboArr
}

// console.log(fibonacci(8)) // -> [1, 1, 2, 3, 5, 8, 13, 21]



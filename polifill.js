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

// .apply

// .promise

// let promise = new Promise((resolve, reject) => setTimeout(() => resolve(1000), 1000));

// function PromisePolifill(url, method, body, executor) {
//     return new PromisePolifill(null, null, null, (resolve, reject) => {
//         let xhr = new XMLHttpRequest();

//         xhr.open(method, url);
    
//         xhr.send();
    
//         xhr.onload = function() {
//             resolve(`Load: ${xhr.response}`);
//         };
//         xhr.onerror = function() {
//             reject(`Ошибка соединения`);
//         }
//     })
// }

// PromisePolifill('https://jsonplaceholder.typicode.com/todos/1', 'GET')

// let xhr = new XMLHttpRequest();

// xhr.open("GET", 'https://jsonplaceholder.typicode.com/todos/1')

// xhr.send()

// xhr.onload = function() {
//     console.log(`Загружено: ${xhr.status} ${xhr.response}`);
//   };
  
//   xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
//     console.log(`Ошибка соединения`);
//   };
  
//   xhr.onprogress = function(event) { // запускается периодически
//     // event.loaded - количество загруженных байт
//     // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
//     // event.total - количество байт всего (только если lengthComputable равно true)
//     console.log(`Загружено ${event.loaded} из ${event.total}`);
//   };

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
// let promise = new PromisePolifill(() => {})
// console.log(promise)
let iy
console.log(iy)
new PromisePolifill((resolve) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", 'https://jsonplaceholder.typicode.com/todos/1')

    xhr.send()

    xhr.onload = function() {
        resolve(`Load: ${xhr.response}`);
    };
})
.then(val => iy = val);
let butt = document.getElementById("button");
let bod = document.getElementById("body")
butt.addEventListener('click', () => console.log(iy))

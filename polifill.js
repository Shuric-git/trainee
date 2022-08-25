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
    Array.prototype.myReduce = function(cb = (item) => {return item}, initialValue) {
        if (!(this instanceof Array || this instanceof String)) {
            throw new Error('Called on wrong type')
        }
        let iterator = 0;
        if (!initialValue) {
            iterator = 1;
            initialValue  = this[0]
        }    

        let accumulator = initialValue;

        for (iterator; iterator < this.length; iterator++) {
            accumulator += cb(this[iterator]);
        }
        return accumulator;
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
promiseAll([first, second, third, fourth]).then(console.log).catch(console.log)


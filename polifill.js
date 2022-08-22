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

Array.prototype.myFilter = function(callback) {
    const filterArray = [];
    for(let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            filterArray.push(this[i]);
        }
    }
    return filterArray;
}

function filterFunction(array, callback) {
    const filterArray = [];
    for(let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            filterArray.push(array[i]);
        }
    }
    return filterArray;
}

console.log(filterFunction([1,2,3,4,10], ((item) => {return item % 2 === 0})))
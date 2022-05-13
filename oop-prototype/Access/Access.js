'use strict'

const fs = require('fs');

const Access = function (path, key) {
    this.path = path;
    this.key = key;
}

Access.prototype.getKey = function() {
    return this.key
}

Access.prototype.access = function() {
    const json = fs.readFileSync(this.path)

    const data = JSON.parse(json)

    for(let i = 0; i < data.length; i++){
        if (data[i].key === this.key) {
            return true
        }
    }

    return false
}

module.exports = Access
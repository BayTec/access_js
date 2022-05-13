'use strict'

const fs = require('fs');

class Access {
    constructor(path, key) {
        this.path = path;
        this.key = key;
    }

    getKey() {
        return this.key
    }

    access() {
        const json = fs.readFileSync(this.path)

        const data = JSON.parse(json)

        for(let i = 0; i < data.length; i++){
            if (data[i].key === this.key) {
                return true
            }
        }

        return false
    }
}

module.exports = Access
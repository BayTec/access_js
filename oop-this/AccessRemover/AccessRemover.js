'use strict'

const fs = require('fs');

const AccessRemover = function (path) {
    this.remove = function(access) {
        let json = fs.readFileSync(path)
        let data = JSON.parse(json)

        for(let i = 0; i < data.length; i++) {
            if (data[i].key === access.key()){
                data.splice(i, 1)
                break
            }
        }

        json = JSON.stringify(data)
        fs.writeFileSync(path, json)
    }
}

module.exports = AccessRemover
'use strict'

import * as fs from "fs";

export const Access = function (path, key) {
    this.key = function() {
        return key
    }

    this.access = function() {
        const json = fs.readFileSync(path)

        const data = JSON.parse(json)

        for(let i = 0; i < data.length; i++){
            if (data[i].key === key) {
                return true
            }
        }

        return false
    }
}
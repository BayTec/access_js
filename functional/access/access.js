'use strict'

import * as fs from "fs";

export const access = function (path, key) {
    const getKey = function() {
        return key
    }

    const access = function() {
        const json = fs.readFileSync(path)

        const data = JSON.parse(json)

        for(let i = 0; i < data.length; i++){
            if (data[i].key === key) {
                return true
            }
        }

        return false
    }

    return {
        key: getKey,
        access,
    }
}
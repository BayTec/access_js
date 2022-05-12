'use strict'

import * as fs from "fs";

export class AccessRemover {
    constructor(path) {
        this.path = path;
    }

    remove(access) {
        let json = fs.readFileSync(this.path)
        let data = JSON.parse(json)

        for(let i = 0; i < data.length; i++) {
            if (data[i].key === access.getKey()){
                data.splice(i, 1)
                break
            }
        }

        json = JSON.stringify(data)
        fs.writeFileSync(this.path, json)
    }
}
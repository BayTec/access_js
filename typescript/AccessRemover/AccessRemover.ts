'use strict'

import fs from "fs";
import { AccessInterface } from "../Access/AccessInterface";

export class AccessRemover {
    constructor(
        private path: string,
    ) {}

    remove(access: AccessInterface): void {
        let json = fs.readFileSync(this.path).toString()
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
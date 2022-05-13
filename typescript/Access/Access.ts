'use strict'

import fs from 'fs';
import { AccessInterface } from "./AccessInterface.js";

export class Access implements AccessInterface {
    constructor(
        private path: string, 
        private key: string,
        ) {}

    getKey(): string {
        return this.key
    }

    access(): boolean {
        const json = fs.readFileSync(this.path).toString()

        const data = JSON.parse(json)

        for(let i = 0; i < data.length; i++){
            if (data[i].key === this.key) {
                return true
            }
        }

        return false
    }
}
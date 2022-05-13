'use strict'

import fs from "fs";
import { AccessInterface } from "./AccessInterface";

export class ActiveAccess {
    constructor(
        private path: string,
        private parent: AccessInterface,
        ) {}
    
    getKey(): string {
        return this.parent.getKey();
    }

    activate(): void {
        let json = fs.readFileSync(this.path).toString();
        let data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === this.parent.getKey()){
                data[i].active = true;
            }
        }

        json = JSON.stringify(data);
        fs.writeFileSync(this.path, json);
    }

    deactivate(): void {
        let json = fs.readFileSync(this.path).toString();
        let data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === this.parent.getKey()){
                data[i].active = false;
            }
        }

        json = JSON.stringify(data);
        fs.writeFileSync(this.path, json);
    }

    access(): boolean {
        if(this.parent.access()){
            const json = fs.readFileSync(this.path).toString();
            const data = JSON.parse(json);

            for (let i = 0; i < data.length; i++){
                if(data[i].key === this.parent.getKey()){
                    return data[i].active??false;
                }
            }
        }

        return false;
    }
}
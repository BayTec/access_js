'use strict'

import * as fs from "fs";

export class ActiveAccess {
    constructor(path, parent) {
        this.path = path;
        this.parent = parent;
    }

    getKey() {
        return this.parent.getKey();
    }

    activate() {
        let json = fs.readFileSync(this.path);
        let data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === this.parent.getKey()){
                data[i].active = true;
            }
        }

        json = JSON.stringify(data);
        fs.writeFileSync(this.path, json);
    }

    deactivate() {
        let json = fs.readFileSync(this.path);
        let data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === this.parent.getKey()){
                data[i].active = false;
            }
        }

        json = JSON.stringify(data);
        fs.writeFileSync(this.path, json);
    }

    access() {
        if(this.parent.access()){
            const json = fs.readFileSync(this.path);
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
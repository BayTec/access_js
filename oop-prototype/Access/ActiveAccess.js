'use strict'

import * as fs from "fs";

export const ActiveAccess = function (path, parent) {
    this.path = path;
    this.parent = parent;
}

ActiveAccess.prototype.getKey = function() {
    return this.parent.getKey();
}

ActiveAccess.prototype.activate = function() {
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

ActiveAccess.prototype.deactivate = function() {
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

ActiveAccess.prototype.access = function() {
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
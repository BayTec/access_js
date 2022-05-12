'use strict'

import * as fs from "fs";

export const ActiveAccess = function (path, access) {
    this.key = function() {
        return access.key();
    }

    this.activate = function() {
        let json = fs.readFileSync(path);
        let data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === access.key()){
                data[i].active = true;
            }
        }

        json = JSON.stringify(data);
        fs.writeFileSync(path, json);
    }

    this.deactivate = function() {
        let json = fs.readFileSync(path);
        let data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === access.key()){
                data[i].active = false;
            }
        }

        json = JSON.stringify(data);
        fs.writeFileSync(path, json);
    }

    this.access = function() {
        if(access.access()){
            const json = fs.readFileSync(path);
            const data = JSON.parse(json);

            for (let i = 0; i < data.length; i++){
                if(data[i].key === access.key()){
                    return data[i].active??false;
                }
            }
        }

        return false;
    }
}
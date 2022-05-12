'use strict'

import * as fs from "fs";
import { Access } from "../Access/Access.js";

export const AccessCreator = function (path) {
    this.path = path;
}

AccessCreator.prototype.create = function () {
    const randomKey = function(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let key = '';

        for (let i = 0; i < length; i++){
            key += charset.charAt(Math.floor(Math.random() * 
            charset.length))
        }

        return key;
    }

    const keyUsed = function(key, keys) {
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                return true
            }
        }

        return false
    }

    let json = fs.readFileSync(this.path)

    let data = JSON.parse(json)
    const keys = []

    for (let i = 0; i < data.length; i++){
        keys.push(data[i].key)
    }

    let key
    do {
        key = randomKey(10)
    } while (keyUsed(key, keys))

    data.push({
        key
    })

    json = JSON.stringify(data)
    fs.writeFileSync(this.path, json)

    return new Access(this.path, key)
}
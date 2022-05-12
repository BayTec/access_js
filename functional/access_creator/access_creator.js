'use strict'

import * as fs from "fs";
import { access } from "../access/access.js";

export const accessCreator = function (path) {
    const create = function () {
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

        let json = fs.readFileSync(path)

        let data = JSON.parse(json)
        const keys = []

        for (let i = 0; i < data.length; i++){
            keys.push(data[i])
        }

        let key
        do {
            key = randomKey(10)
        } while (keyUsed(key, keys))

        data.push({
            key
        })

        json = JSON.stringify(data)

        fs.writeFileSync(path, json)

        return access(path, key)
    }

    return {
        create,
    }
}
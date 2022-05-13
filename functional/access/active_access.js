'use strict'

const fs = require('fs')

const activeAccess = function (path, access) {
    const activate = function() {
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

    const deactivate = function() {
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

    const getActive = function() {
        const json = fs.readFileSync(path);
        const data = JSON.parse(json);

        for (let i = 0; i < data.length; i++){
            if(data[i].key === access.key()){
                return data[i].active??false;
            }
        }

        return false;
    }

    const activeAccess = function() {
        if(access.access()){
            if(getActive()){
                return true;
            }
        }

        return false;
    }

    return {
        activate,
        deactivate,
        key: access.key,
        access: activeAccess
    }
}

module.exports = activeAccess
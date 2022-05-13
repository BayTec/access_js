'use strict'

const ActiveAccess = require('../Access/ActiveAccess.js');

class ActiveAccessCreator {
    constructor(path, accessCreator) {
        this.path = path;
        this.accessCreator = accessCreator;
    }

    create() {
        const access = new ActiveAccess(this.path, this.accessCreator.create());

        access.activate();

        return access;
    }
}

module.exports = ActiveAccessCreator
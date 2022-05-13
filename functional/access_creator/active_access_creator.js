'use strict'

const activeAccess = require('../access/active_access.js');

const activeAccessCreator = function(path, accessCreator, active) {
    const create = function() {
        const access = activeAccess(path, accessCreator.create());

        access.activate();

        return access;
    }

    return {
        create
    }
}

module.exports = activeAccessCreator
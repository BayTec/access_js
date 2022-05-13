'use strict'

const ActiveAccess = require('../Access/ActiveAccess.js');

const ActiveAccessCreator = function(path, accessCreator) {
    this.create = function() {
        const access = new ActiveAccess(path, accessCreator.create());

        access.activate();

        return access;
    }
}

module.exports = ActiveAccessCreator
'use strict'

import { ActiveAccess } from "../Access/ActiveAccess.js";

export const ActiveAccessCreator = function(path, accessCreator) {
    this.path = path;
    this.accessCreator = accessCreator;
}

ActiveAccessCreator.prototype.create = function() {
    const access = new ActiveAccess(this.path, this.accessCreator.create());

    access.activate();

    return access;
}
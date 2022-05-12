'use strict'

import { ActiveAccess } from "../Access/ActiveAccess.js";

export const ActiveAccessCreator = function(path, accessCreator) {
    this.create = function() {
        const access = new ActiveAccess(path, accessCreator.create());

        access.activate();

        return access;
    }
}
'use strict'

import { activeAccess } from "../access/active_access.js";

export const activeAccessCreator = function(path, accessCreator, active) {
    const create = function() {
        const access = activeAccess(path, accessCreator.create());

        access.activate();

        return access;
    }

    return {
        create
    }
}
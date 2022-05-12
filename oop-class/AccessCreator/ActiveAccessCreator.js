'use strict'

import { ActiveAccess } from "../Access/ActiveAccess.js";

export class ActiveAccessCreator {
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
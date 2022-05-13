'use strict'

import { ActiveAccess } from "../Access/ActiveAccess.js";
import { AccessCreatorInterface } from "./AccessCreatorInterface.js";

export class ActiveAccessCreator {
    constructor(
        private path: string,
        private parent: AccessCreatorInterface,
    ) {}

    create(): ActiveAccess {
        const access = new ActiveAccess(this.path, this.parent.create());

        access.activate();

        return access;
    }
}
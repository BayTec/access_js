'use strict'

import fs from "fs";
import { Access } from "./Access/Access.js";
import { AccessCreator } from "./AccessCreator/AccessCreator.js";
import { ActiveAccessCreator } from "./AccessCreator/ActiveAccessCreator.js";
import { AccessRemover } from "./AccessRemover/AccessRemover.js";


function main() {
    const jsonPath = './data/data.json'

    if(!fs.existsSync('./data')){
        fs.mkdirSync('./data')
    }

    fs.writeFileSync(jsonPath, '[]')

    const creator = new AccessCreator(jsonPath)
    const validAccess = creator.create()
    const invalidAccess = new Access(jsonPath, 'wrong')

    console.log(validAccess.access())
    console.log(invalidAccess.access())

    const activeCreator = new ActiveAccessCreator(jsonPath, creator)
    const activeAccess = activeCreator.create()

    console.log(activeAccess.access())

    activeAccess.deactivate()

    console.log(activeAccess.access())

    const remover = new AccessRemover(jsonPath)

    remover.remove(validAccess)
    remover.remove(activeAccess)

    console.log(validAccess.access())
    console.log(activeAccess.access())
}

main()
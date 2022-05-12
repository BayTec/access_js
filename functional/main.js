'use strict'

import { access } from "./access/access.js";
import { accessCreator } from "./access_creator/access_creator.js";
import { activeAccessCreator } from "./access_creator/active_access_creator.js";
import { accessRemover } from "./access_remover/access_remover.js";

function main() {
    const jsonPath = './data/data.json'

    const creator = accessCreator(jsonPath)
    const validAccess = creator.create()
    const invalidAccess = access(jsonPath, 'wrong')

    console.log(validAccess.access())
    console.log(invalidAccess.access())

    const activeCreator = activeAccessCreator(jsonPath, creator, true)
    const activeAccess = activeCreator.create()

    console.log(activeAccess.access())

    activeAccess.deactivate()

    console.log(activeAccess.access())

    const remover = accessRemover(jsonPath)

    remover.remove(validAccess)
    remover.remove(activeAccess)

    console.log(validAccess.access())
    console.log(activeAccess.access())
}

main()
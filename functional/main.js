'use strict'

const fs = require('fs');
const access = require('./access/access.js');
const accessCreator = require('./access_creator/access_creator');
const activeAccessCreator = require('./access_creator/active_access_creator.js');
const accessRemover = require('./access_remover/access_remover.js');

function main() {
    const jsonPath = './data/data.json'

    if(!fs.existsSync('./data')){
        fs.mkdirSync('./data')
    }

    fs.writeFileSync(jsonPath, '[]')

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
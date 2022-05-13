'use strict'

const fs = require('fs');
const Access = require('./Access/Access.js');
const AccessCreator = require('./AccessCreator/AccessCreator.js');
const ActiveAccessCreator = require('./AccessCreator/ActiveAccessCreator.js');
const AccessRemover = require('./AccessRemover/AccessRemover.js');


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

    const activeCreator = new ActiveAccessCreator(jsonPath, creator, true)
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
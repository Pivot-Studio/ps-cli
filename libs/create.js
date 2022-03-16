const spawn = require('cross-spawn');
const chalk = require('chalk')
const createComponent = require('./create-component.js')

module.exports = async (name, options) => {
    if (name == 'component') {
        createComponent()
    }
}
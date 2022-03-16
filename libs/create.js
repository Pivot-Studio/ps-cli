const spawn = require('cross-spawn');
const chalk = require('chalk')
const createComponent = require('./create-component.js')

module.exports = async (name = 'component', ...args) => {
    // create 的判断
    // console.log(name, ...args);
    if (name == 'component') {
        createComponent()
    }
}
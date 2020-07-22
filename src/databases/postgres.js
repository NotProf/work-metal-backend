const Sequelize = require('sequelize');
const keys = require('../helpers/key');

const db = new Sequelize(keys.dbOptions);

async function openConnection() {
    await db.sync({force: true});
}

module.exports = {db, openConnection};

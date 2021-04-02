const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');
/*
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
*/
const db = {};
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
/*
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
*/
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.USERS = require("./user")(sequelize, Sequelize);
db.GENDERS = require("./gender")(sequelize, Sequelize);

module.exports = db;
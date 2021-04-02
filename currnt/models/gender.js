module.exports = (sequelize, Sequelize) => {
    const Gender = sequelize.define('gender',
        {
            id: { type: Sequelize.TINYINT, autoIncrement: true, allowNull: false, primaryKey: true },
            name: { type: Sequelize.STRING(10), allowNull: false }
        }, {
        timestamps: false
    });
    return Gender;
}
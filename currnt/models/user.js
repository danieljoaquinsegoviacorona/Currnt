module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user',
        {
            user_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
            first_name: { type: Sequelize.STRING(50), allowNull: false },
            last_name: { type: Sequelize.STRING(50), allowNull: false },
            birth_date: { type: Sequelize.DATEONLY, allowNull: false },
            password: { type: Sequelize.CHAR(40), allowNull: false },
            gender: { type: Sequelize.TINYINT, allowNull: false },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    return User;
};
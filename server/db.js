const Sequelize = require('sequelize');

let databaseURI = process.env.NODE_ENV === 'production' ? process.env.prodPostgres : 'postgres://localhost:5432/microauth';

const db = new Sequelize(databaseURI, { logging: false });

const User = db.define('user', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    googleId: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    photo: {
        type: Sequelize.STRING,
    }
})

module.exports = {
    db,
    User
};

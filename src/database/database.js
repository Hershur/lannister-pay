import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('FeesDb', 'user', 'password', {
    dialect: 'sqlite',
    host: './dev.sqlite'
});

export default sequelize;
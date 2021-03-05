const seq = require('sequelize');
const dbConfigs = {
    dialect: 'postgres',
    port: 6969,
    dialectOptions: {socketPath: '/tmp/.s.PGSQL.5432'}
};
const {QueryTypes} = require('sequelize');
const eprintSeq = new seq.Sequelize('eprint', 'postgres', null, dbConfigs);

module.exports = {
    sample: async () => {
        const users = await eprintSeq.query("SELECT * FROM user", {type: QueryTypes.SELECT});
        console.log(users);
    }
}
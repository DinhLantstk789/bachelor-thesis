const seq = require('sequelize');
const {QueryTypes} = require('sequelize');
const dbConfigs = {
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {socketPath: '/tmp/.s.PGSQL.5432'}
};
const eprints = new seq.Sequelize('eprints', 'postgres', null, dbConfigs);

module.exports = {
    fetchAllArticles: async () => {
        const users = await eprints.query("SELECT * FROM articles WHERE status = 'Published';", {type: QueryTypes.SELECT});
        console.log(users);
    }
}

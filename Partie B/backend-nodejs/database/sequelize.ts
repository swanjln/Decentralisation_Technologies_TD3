import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'decentalizedDB',
  username: 'LearningDBUser',
  password: 'root',
  host: 'localhost', // Database host (e.g., 'localhost')
  dialect: 'postgres', // Specify the PostgreSQL dialect
  port: 5432, // Default PostgreSQL port
});

(async () => {
  try {
    // Check database connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync the model with the database
    await sequelize.sync();
    console.log('Database synchronized successfully');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;

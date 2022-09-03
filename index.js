/* eslint-disable no-console */
const app = require('./app');
const { sequelize } = require('./models');

const { PORT } = process.env;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});

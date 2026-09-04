const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');

app.listen(env.port, () => {
  logger.info(`Server is running on http://localhost:${env.port} [${env.nodeEnv}]`);
});
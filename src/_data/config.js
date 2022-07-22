const PROD_ENV = "prod";
const DEV_ENV = "dev";

const env = process.env.ENV || DEV_ENV;
const isProd = env === PROD_ENV;

module.exports = {
  isProd,
};

function isEnvLocal() {
  return process.env.APP_ENV === "local";
}

function isEnvProd() {
  return process.env.APP_ENV === "production";
}

module.exports = {
  isEnvLocal,
  isEnvProd,
};

var session = require("express-session");
var Keycloak = require("keycloak-connect");
let _keycloak;
var keycloakConfig = {
  clientId: "myclient",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/auth",
  realm: "myrealm",
  realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+vDJ0lCTUJ1HW0aQ4aLwvH5x5SX6U1ORqKJScBIBJKZ+1mUpK2fDRcT4HPvK1nOniadu7x9d9pWy9NU/Y261gchyfkIPyI8zNuUyH4m9jdO5e/lLsEQW4ZTM05jP31fILTrbsPy4vENZuhoFdtjKbEFmj1+dfe2iMYx8q4D3dBZIAvNGXsCtqYT8jD4eu7nvW0UKCSvSH2J17ReIyGBHMeDLeHBx+hSpdeomNKe3lqTIBvTFFWZ7aLgWWBDPFh46nFk/XsDMXgofSjxgOkKlOBNeMph960UpShSWt6kecqkNQ6Fv+yWPziPyoU1J+aEfRQx+QKpZNRjONJRvUVY/wIDAQAB"
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    var memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}
function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}
module.exports = {
  initKeycloak,
  getKeycloak,
};

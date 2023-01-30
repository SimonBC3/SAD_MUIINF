var session = require("express-session");
var Keycloak = require("keycloak-connect");
let _keycloak;
var keycloakConfig = {
  clientId: "myclient",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/",
  realm: "myrealm",
  realmPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp7ufuhPkDzZGGhwO6XD8cR/URqqrwl9imJx1iPL6uGn2dUHl3C/LFAMnICnHZEteXP5zbYJuOIVd9gep1egeQsLNkPMBOZnkypfSkzE+EUBsRJaCyzhmt/cfP7SVwn8/zxlmyJLobGWfznIsMcdcCkE+MMRpIQoN9ThnDc4MZw1Ug1NA1wBIfmCOHVVJ1B0gOtvdzdOifbCaV/Lpse/wOXTjL+tgqu2bRqyRfy3iSDkLcNRievVRHnILNJPjFSH3CTPNpVSff6UjR2bQ+6djJGiebSLi1KMTIEQYhcdysKXLBezGTEl9dI72ayHREH1s96kywrkULt98ar1B5HL59wIDAQAB",
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

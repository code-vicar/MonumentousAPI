/**
* Policy defines middleware that is run before each controller/action.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

  // Default policy require an api key
  '*': 'keyed',

  // home controller is public, no keys
  'home': {
    '*': true
  },

  'user': {
    "login":true,
    "create":["keyed","signed"],
    "update":["keyed","signed"],
    "destroy":["keyed","signed"],
    "index":["keyed","signed"],
    "find":["keyed","signed"]
  }
};
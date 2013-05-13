/**
* Policy defines middleware that is run before each controller/controller.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

  // Default policy (allow public access)
  '*': 'authenticated',

  'home': {
    '*': true
  },

  'user': {
    'create': true,
    'login': true,
    'update': 'self',
    'destroy': 'admin',
    'find': 'admin',
    'findAll': 'admin'
  },

  // need to be signed in to Create a comment
  //   only the author of a comment
  'comment': {
    'destroy': 'commentAuthor',
    'update': 'commentAuthor'
  },

  'post': {
    'create': 'admin',
    'destroy': 'admin',
    'update': 'admin'
  }
};
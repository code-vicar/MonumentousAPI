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
    'login': true
  },

  // need to be signed in to Create a comment
  //   only the author of a comment
  'comment': {
    'create': 'author',
    'destroy': 'author',
    'update': 'author'
  },

  'post': {
    'create': 'author',
    'destroy': 'author',
    'update': 'author'
  }
};
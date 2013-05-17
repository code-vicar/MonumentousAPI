/**
* Policy defines middleware that is run before each controller/controller.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

  // Default policy require an api key
  '*': 'keyed',

  // home controller is public, no keys
  'home': {
    '*': true
  }

  // // user controller
  // //  only updatable by logged in user, or admin
  // 'user': {
  //   'update': 'self',
  //   'destroy': 'admin',
  //   'find': 'admin',
  //   'findAll': 'admin'
  // },

  // // need to be signed in to Create a comment
  // //   only the author of a comment
  // 'comment': {
  //   'destroy': 'commentAuthor',
  //   'update': 'commentAuthor'
  // },

  // 'post': {
  //   'create': 'admin',
  //   'destroy': 'admin',
  //   'update': 'admin'
  // }
};
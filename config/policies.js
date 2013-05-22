/**
* Policy defines middleware that is run before each controller/action.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/

//define an object that will build the policy for a given route
// var policyGenerator = function(defaults) {
//   var policyGenerator = function() {
//     var self = this;
//     //make a copy of the defaults
//     var policyArray = defaults.filter(function(){return true;});
    
//     //calling toArray resets the policyArray to the default policies
//     this.toArray = function() {
//       //save the policyArray for returning
//       var returnVal = policyArray;
//       //reset the policyArray
//       policyArray = defaults.filter(function(){return true;});
//       //return the original value
//       return returnVal;
//     };

//     //return self to allow chaining
//     this.addPolicy = function(policy) {
//       policyArray.push(policy);
//       return self;
//     };
//   };
  
//   return new policyGenerator();
// };

//default policies for all routes
var keyed = ["keyed", "filterParams"];
//defaults + signed
var signed = ["keyed", "signed", "filterParams"];
//signed + by owner (or admin)
var signedByOwner = ["keyed", "signed", "owner", "filterParams"];
//signed + by admin
var signedByAdmin = ["keyed", "signed", "admin", "filterParams"];

module.exports.policies = {
  // Default policy, apply a filter to the parameters and require an api key
  '*': "keyed",

  // home controller has no policies
  'home': {
    '*': true
  },

  'user': {
    "create":keyed,
    "update":signedByOwner,
    "destroy":signedByOwner,
    "index":signed,
    "find":signed
  },

  'post': {
    "create":signedByAdmin,
    "update":signedByOwner,
    "destroy":signedByOwner,
    "index":keyed,
    "find":keyed
  },

  'comment': {
    "create":signed,
    "update":signedByOwner,
    "destroy":signedByOwner,
    "index":keyed,
    "find":keyed
  }
};
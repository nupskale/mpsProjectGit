app.controller('loginCtrl', function($scope, $state, UserService){
  $scope.signin = function(){
     var provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;        
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      $state.go('eventlist');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }; 
});

app.controller('evenListCtrl', function($scope, $state, UserService){

  $scope.logout = function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      $state.go('login');     
    }, function(error) {
      // An error happened.
    });
  };

  $scope.listtodo = [{'name':'Chemistry Homework'},{'name':'Physics Assignment'},
  {'name':'Mathematics Homework'},{'name':'Biology Exam'},{'name':'History Quiz'}]

});
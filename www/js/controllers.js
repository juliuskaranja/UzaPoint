angular.module('starter.controllers', [])

.controller('homeController', function ($scope,$state) {
      $scope.goLoginPage = function () {//login
        $state.go('login')
      };
      $scope.goSignUpPage = function () {
        $state.go('signUp')
      };
    })


.controller('loginController', function ($scope,$state,$http,toastr) {
     $scope.login = function (loginData) {
       console.info(loginData);
         //send an ajax request
         $http({
             url:url+'PostLoginAgent',
             method:'POST',
             data:loginData,
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (response) {

             //if respond with status success
             if(response.status == 'success'){
                 sessionStorage.setItem('loggedIn',true);
                 sessionStorage.setItem('user_id',response.user.id);
                 sessionStorage.setItem('name',response.user.name);
                 sessionStorage.setItem('email',response.user.email);
                 toastr.success('Successfully logged In');
                 $state.go('app.mainMenu');
             }
             else{
                toastr.error(response.message,response.status);
             }
         }).error(function (err) {
             toastr.error('Check your internet connection and retry');
         })
     }
    })

    //controller for the main menu template abstract.
    .controller('AppCtrl', function ($scope,$state,$ionicHistory,toastr) {
        $scope.name = sessionStorage.name;
        $scope.email = sessionStorage.email;

        //sign out the user..
        $scope.logout = function () {
            //clear the session storage..
            sessionStorage.clear();
            //clear the ionic history
            $ionicHistory.clearHistory();
            toastr.success('Successfully signed out');
            $state.go('login')
        }
    })

    //the main menu controller
    .controller('mainMenuController', function ($scope) {
    })


    //the sign up controller
    .controller('signUpController', function ($scope,$http,$state,toastr) {
        $scope.signUpMethod = function (signUpData) {
            $http({
                url:url+'signUpRetailer',
                method:'POST',
                data:signUpData,
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (response) {
                if(response.status == 'success'){
                    $state.go('login');
                    toastr.success('successfully created a retailer account');
                }else{
                    toastr.error(response.error)
                }
            }).error(function (error) {
                console.error(error)
            })
        };
    })




















/*
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
*/

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

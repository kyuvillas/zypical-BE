app.controller('HomeController', function ($window,Auth,$rootScope,$state, $scope, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav) {
    $scope.SVG = ConfigurableItems.SVG;

    $scope.ostat = 2;
    $scope.ChangeOstat = function (id) {
        $scope.ostat = id;
    }


    $scope.openMenu = function($mdMenu, ev) {
      // originatorEv = ev;
      $mdMenu.open(ev);
    };
    // if ($window.sessionStorage["userInfo"]) {
    //   var credentials = JSON.parse($window.sessionStorage["userInfo"]);
    //   $scope.login(credentials);
    // }

    // login
    $scope.showDialog = showDialog;
    $scope.items = [1, 2, 3];

    $scope.try= function(){
      DataFactory.SignUp().
            then(function(resonse) {
                alert(resonse.data);
            })
    }
    function showDialog($event,loc) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         templateUrl:'angular/Modules/Home/login-dialog.html',
         locals: {
           items: $scope.items,
           loc:loc
         },
         controller: DialogController,
         clickOutsideToClose: true,
      escapeToClose: true
      });
      function DialogController($scope, $mdDialog, items,loc) {
        $scope.items = items;
        $scope.selectedTab = loc;
        console.log(loc);
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }

        $scope.submit = function() {
          // you can check is form valid with help of $valid parameter
          if($scope.formName.$valid){
              // alert("Name is " + $scope.username);
              var res = $rootScope.SignIn($scope.username,$scope.password);
                
                
                if(res == 'Unauthorized'){
                  alert('Unauthorized credentials');
                }else if(res.role == 'seller'){
                  console.log(res);
                  $state.go('storeprofile');
                }

            
          }
        }

        $scope.signup = function() {
          // you can check is form valid with help of $valid parameter
          if($scope.signupForm.$valid){
                var user = {
                  "fname": $scope.signup_fname,
                  "lname": $scope.signup_lname,
                  "gender": $scope.signup_gender,
                  "username": $scope.signup_username,
                  "password": $scope.signup_pass,
                  "emailadd": $scope.signup_emailadd
                }
                DataFactory.SignUp(user)
                .then(function (response) {
                   console.log(response.data);
                   if(response.data){
                      // $mdDialog.hide();
                      $scope.login(user);

                   }
                });             
          }else{ 
            angular.forEach($scope.signupForm.$error.required, function(field) {
                field.$setTouched();
            });
          }
        }


        $scope.credentials = {};
        $scope.loginForm = {};
        $scope.error = false;
        
        //when the form is submitted
        $scope.login_submit = function() {
          $scope.submitted = true;
          if (!$scope.loginForm.$invalid) {
            $scope.login($scope.login);
          } else {
            angular.forEach($scope.loginForm.$error.required, function(field) {
                field.$setTouched();
            });
            $scope.error = true;
            return;
          }
        };

        //Performs the login function, by sending a request to the server with the Auth service
        $scope.login = function(credentials) {
          $scope.error = false;
          Auth.login(credentials, function(user) {
            //success function
            $mdDialog.hide();
            $state.go('userprofile');
          }, function(err) {
            console.log("error");
            $scope.error = true;
          });
        };
        
        // if a session exists for current user (page was refreshed)
        // log him in again
        

        $scope.logout = function(){
          Auth.login();
        }
      }
    }
    $scope.login =function(credentials) {
          $scope.error = false;
          Auth.login(credentials, function(user) {
            //success function
            $mdDialog.hide();
            $state.go('userprofile');
          }, function(err) {
            console.log("error");
            $scope.error = true;
          });
        };
    

})
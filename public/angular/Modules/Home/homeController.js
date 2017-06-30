app.controller('HomeController', function ($location, $document) {
    var h = this;
    
//    h.SVG = ConfigurableItems.SVG;
//
//    h.ostat = 2;
//    h.ChangeOstat = function (id) {
//        h.ostat = id;
//    }

    h.goToArea = function(area){
        var chosenElement = angular.element(document.getElementById(area));
        $document.scrollToElementAnimated(chosenElement, 0, 1000);
//        $location.hash(area);
//        $anchorScroll();
    }

//    h.openMenu = function($mdMenu, ev) {
//      // originatorEv = ev;
//      $mdMenu.open(ev);
//    };
//    
//    h.showDialog = showDialog;
//    h.items = [1, 2, 3];
//
//    h.try= function(){
//      DataFactory.SignUp().
//            then(function(resonse) {
//                alert(resonse.data);
//            })
//    }
//    function showDialog($event,loc) {
//       var parentEl = angular.element(document.body);
//       $mdDialog.show({
//         parent: parentEl,
//         targetEvent: $event,
//         templateUrl:'angular/Modules/Home/login-dialog.html',
//         locals: {
//           items: h.items,
//           loc:loc
//         },
//         controller: DialogController,
//         clickOutsideToClose: true,
//      escapeToClose: true
//      });
//      function DialogController(h, $mdDialog, items,loc) {
//        h.items = items;
//        h.selectedTab = loc;
//        console.log(loc);
//        h.closeDialog = function() {
//          $mdDialog.hide();
//        }
//
//        h.submit = function() {
//          // you can check is form valid with help of $valid parameter
//          if(h.formName.$valid){
//              // alert("Name is " + h.username);
//              var res = $rootScope.SignIn(h.username,h.password);
//                
//                
//                if(res == 'Unauthorized'){
//                  alert('Unauthorized credentials');
//                }else if(res.role == 'seller'){
//                  console.log(res);
//                  $state.go('storeprofile');
//                }
//
//            
//          }
//        }
//
//        h.signup = function() {
//          // you can check is form valid with help of $valid parameter
//          if(h.signupForm.$valid){
//                var user = {
//                  "fname": h.signup_fname,
//                  "lname": h.signup_lname,
//                  "gender": h.signup_gender,
//                  "username": h.signup_username,
//                  "password": h.signup_pass,
//                  "emailadd": h.signup_emailadd
//                }
//                DataFactory.SignUp(user)
//                .then(function (response) {
//                   console.log(response.data);
//                   if(response.data){
//                      // $mdDialog.hide();
//                      h.login(user);
//
//                   }
//                });             
//          }else{ 
//            angular.forEach(h.signupForm.$error.required, function(field) {
//                field.$setTouched();
//            });
//          }
//        }
//
//
//        h.credentials = {};
//        h.loginForm = {};
//        h.error = false;
//        
//        //when the form is submitted
//        h.login_submit = function() {
//          h.submitted = true;
//          if (!h.loginForm.$invalid) {
//            h.login(h.login);
//          } else {
//            angular.forEach(h.loginForm.$error.required, function(field) {
//                field.$setTouched();
//            });
//            h.error = true;
//            return;
//          }
//        };
//
//        //Performs the login function, by sending a request to the server with the Auth service
//        h.login = function(credentials) {
//          h.error = false;
//          Auth.login(credentials, function(user) {
//            //success function
//            $mdDialog.hide();
//            $state.go('userprofile');
//          }, function(err) {
//            console.log("error");
//            h.error = true;
//          });
//        };
//        
//        // if a session exists for current user (page was refreshed)
//        // log him in again
//        
//
//        h.logout = function(){
//          Auth.login();
//        }
//      }
//    }
//    h.login =function(credentials) {
//      h.error = false;
//      Auth.login(credentials, function(user) {
//        //success function
//        $mdDialog.hide();
//        $state.go('userprofile');
//      }, function(err) {
//        console.log("error");
//        h.error = true;
//      });
//    };
    

})
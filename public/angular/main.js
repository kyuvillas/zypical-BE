(function(){
    'use strict';
        /* MAIN MODULE */
    angular
        .module('MainApplication', ['ngSanitize','zy-Auth','zy-Router', 'ngAnimate', 'ngMaterial', 'jQueryScrollbar', 'HUD-ContentManager', 'HUD-Factory', 'HUD-Directives', 'ang-drag-drop', 'duScroll', 'home'])
        .config(['$mdThemingProvider', function($mdThemingProvider){
            $mdThemingProvider.generateThemesOnDemand(true);
        }])
        .controller('MainController', MainController);
                    
        function MainController($window,$rootScope,$scope,$state, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav,Auth, AUTH_EVENTS,USER_ROLES) {
            
              // SEARCH
              $scope.search = function(key){
                  console.log(key);
                  $state.go('search1',{keyword:key});
              }
                $scope.mainstate = $state;
                $scope.ChangeState = function (state) {
                    $state.go(state);
                }

                if ($window.localStorage["userInfo"]) {
                  var credentials = JSON.parse($window.localStorage["userInfo"]);
                    login(credentials);
                }
              function login(credentials) {
                      $scope.error = false;
                      Auth.login(credentials, function(user) {
                        //success function
                        // $mdDialog.hide();
                        if($scope.mainstate.current.name=='home')  $state.go('userprofile');
                      }, function(err) {
                        $scope.error = true;
                      });
                    };
                $scope.modalShown = false;
                $scope.auth = 'notAuthenticated';
                var showLoginDialog = function() {
                //do something when not authorized
                    $scope.auth = 'notAuthenticated';
                };
              $scope.logout = function() {
                //do something when not authorized
                Auth.logout();
                $state.go('home');
              };

                var setCurrentUser = function(){
                    $scope.auth = 'loginSuccess';
                $scope.isLoggedIn = 'true';
                    $scope.currentUser = $rootScope.currentUser;	
                }
                var setGuestUser = function(){
                $scope.auth = 'guestSuccess';
                $scope.isLoggedIn = 'true';
                $scope.currentUser = $rootScope.currentUser;  
              }
                var showNotAuthorized = function(){
                    $scope.auth = 'notAuthorized';
                    // alert("Not Authorized");
                }

                $scope.currentUser = null;
                $scope.userRoles = USER_ROLES;
                $scope.isAuthorized = Auth.isAuthorized;

                //listen to events of unsuccessful logins, to run the login dialog
                $rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
                $rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
                $rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
                $rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
                $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
              $rootScope.$on(AUTH_EVENTS.guestSuccess, setGuestUser);



        };
})();



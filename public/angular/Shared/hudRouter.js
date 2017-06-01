
/* For Authentication and UI-Router */
var hudRouter = angular.module('HUD-Router', ["ui.router"]); //
hudRouter.factory('principal', ['$q', '$http', '$timeout', function ($q, $http, $timeout) {
    var _identity = undefined,
      _authenticated = false;
    var sampleProfiles = [
        {   
            emailaddress:"q@zypical",
            fname:"Queenie",
            gender:"Female",
            lname:"Villasin",
            assword:"1234",
            userid:"4",
            username:"kyuvillas"
        }
    ];
    return {
        GetProfile: function () {
            if (_identity == null || _identity == undefined)
                // return "Unauthorized";
            return sampleProfiles[0];
            else
                return _identity[0];
        },
        isIdentityResolved: function () {
            return angular.isDefined(_identity);
        },
        isAuthenticated: function () {
            return _authenticated;
        },
        isInRole: function (role) {
            if (!_authenticated || !_identity.roles) return false;
            return _identity.roles.indexOf(role) != -1;
        },
        isInAnyRole: function (roles) {
            if (!_authenticated || !_identity.roles) return false;

            for (var i = 0; i < roles.length; i++) {
                if (this.isInRole(roles[i])) return true;
            }

            return false;
        },
        authenticate: function (identity) {
            console.log(identity);
            _identity = identity;
            _authenticated = identity != null && identity != undefined;

            // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
            if (identity) localStorage.setItem("demo.identity", angular.toJson(identity));
            else localStorage.removeItem("demo.identity");
        },
        identity: function (force) {
            var deferred = $q.defer();

            if (force === true) _identity = undefined;

            // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
            //                   $http.get('/svc/account/identity', { ignoreErrors: true })
            //                        .success(function(data) {
            //                            _identity = data;
            //                            _authenticated = true;
            //                            deferred.resolve(_identity);
            //                        })
            //                        .error(function () {
            //                            _identity = null;
            //                            _authenticated = false;
            //                            deferred.resolve(_identity);
            //                        });

            // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might be a way if you use cookies or need to retrieve the latest identity from an api
            // i put it in a timeout to illustrate deferred resolution
            var self = this;
            $timeout(function () {
                _identity = angular.fromJson(localStorage.getItem("demo.identity"));
                self.authenticate(_identity);
                deferred.resolve(_identity);
            }, 1000);

            return deferred.promise;
        },
        SignOut: function () {
            principal.authenticate(null);
            $state.go('dashboard');
        },
        Signin: function (username, password) {
            return $http({
                url: "../index.php/home_controller/login?username="+username+"&password="+password,
                method: 'GET'
            });

            // if (username == "mnl" && password == "1234") {
            //     return sampleProfiles[0];
            
            // } else { return "Unauthorized"; }
        },
        ValidateUser: function (user) {
            return $http({
                url: "../api/v1/user/login",
                method: 'POST',
                data: user
            });
        }
    };
}]);
hudRouter.factory('authorization', ['$rootScope', '$state', 'principal', function ($rootScope, $state, principal) {
    return {
        authorize: function () {
            return principal.identity()
              .then(function () {
                  var isAuthenticated = principal.isAuthenticated();
                  try {
                      if (angular.isDefined($rootScope.toState.data.roles)) {
                          if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                              if (isAuthenticated) $state.go('dashboard'); // user is signed in but not authorized for desired state
                              else {
                                  // user is not authenticated. stow the state they wanted before you
                                  // send them to the signin state, so you can return them when you're done
                                  $rootScope.returnToState = $rootScope.toState;
                                  $rootScope.returnToStateParams = $rootScope.toStateParams;

                                  // now, send them to the signin state so they can log in
                                  $state.go('dashboard');
                                  //console.log("unauthorized access");
                              }
                          }
                      }
                      else { //console.log("role undefined");
                      }
                  } catch (e) { //console.log(e); 
                  }
              });
        }
    };
}]);
hudRouter.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal', '$mdDialog', function ($rootScope, $state, $stateParams, authorization, principal,$mdDialog) {
    $rootScope.checkDataLoads = 0;
    $rootScope.invalid = false;
    $rootScope.Config = {
        showSLT: true,
        showSLS: true,
        showSLA: false,
        showEMS: true,
        showResiliency: false
    }
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;

        if (principal.isIdentityResolved()) authorization.authorize();
    });
    $rootScope.SignOut = function () {
        principal.authenticate(null);
        $state.go('dashboard');
    };
    $rootScope.SignIn = function (username, password) {
        $rootScope.invalid = false;
        // use when calling ajax call already
        // principal.Signin(username, password).then(function (data) {

        //     if (data == "Unauthorized") { $rootScope.invalid = true; }
        //     else {
        //         principal.authenticate(data);
        //         if (data.role == "seller") {
        //             $state.go("storeprofile");//admin
        //             return sampleProfiles[0];
        //         // } 
        //         // else if (data.role == "Manual Override Administrator") {
        //         //     $state.go("dashboard");//moadmin
        //         //     return sampleProfiles[1];
        //         // } 

        //         } else { $state.go("/"); }
        //     }
        // });

        return principal.Signin(username, password)
            

    }
    $rootScope.GetProfile = function () {
        return principal.GetProfile();
    }
}]);
hudRouter.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/userprofile','/userprofile/shops');
    $stateProvider
        
        .state('home', {
            name: 'home',
            parent: '',
            data: {
                roles: []
            },
            url: "/",
            templateUrl: "angular/Modules/Home/home.html",
            controller: "HomeController"
        })
        .state('search1', {
            name: 'search1',
            parent: '',
            data: {
                roles: []
            },
            url: "/search1",
            templateUrl: "angular/Modules/Search/result.html",
            controller: "SearchController"
        })
        
        .state('storeprofile', {
            name: 'storeprofile',
            parent: '',
            data: {
                roles: ['seller']
            },
            url: "/storeprofile/:id",
            templateUrl: "angular/Modules/Profile/storeprofile.html",
            controller: "StoreProfileController"
        })
        .state('userprofile', {
            name: 'userprofile',
            parent: '',
            data: {
                roles: ['seller']
            },
            url: "/userprofile",
            templateUrl: "angular/Modules/Profile/User/userprofile.html",
            controller: "UserProfileController"
        })
        .state('userprofile.shops', {
            name: 'userprofile.shops',
            parent: 'userprofile',
            data: {
                roles: ['seller']
            },
            url: "/shops",
            templateUrl: "angular/Modules/Profile/User/Shops/shops.html",
            controller: "UserProfileController"
        })
        .state('userprofile.personal', {
            name: 'userprofile.personal',
            parent: 'userprofile',
            data: {
                roles: ['seller']
            },
            url: "/personal",
            templateUrl: "angular/Modules/Profile/User/Personal/personal.html",
            controller: "UserProfileController"
        })

}]);

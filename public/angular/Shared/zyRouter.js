
/* For Authentication and UI-Router */
var zyRouter = angular.module('zy-Router', ["ui.router"]); //

zyRouter.config(['$stateProvider', '$urlRouterProvider','USER_ROLES', function ($stateProvider, $urlRouterProvider,USER_ROLES) {
    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/userprofile','/userprofile/shops');
    $stateProvider
        
        .state('home', {
            name: 'home',
            parent: '',
            data: {
              authorizedRoles: [USER_ROLES.guest,USER_ROLES.admin]
            },
            url: "/",
            templateUrl: "angular/Modules/Home/home.html",
            controller: "HomeController"
        })
        .state('search1', {
            name: 'search1',
            parent: '',
            data: {
                authorizedRoles: [USER_ROLES.guest,USER_ROLES.admin]
            },
            url: "/search1/:keyword",
            templateUrl: "angular/Modules/Search/result.html",
            controller: "SearchController"
        })
        
              // authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        // .state('storeprofile', {
        //     name: 'storeprofile',
        //     parent: '',
        //     data: {
        //       authorizedRoles: [USER_ROLES.admin]
        //     },
        //     url: "/storeprofile/:id",
        //     templateUrl: "angular/Modules/Profile/newstoreprofile.html",
        //     controller: "StoreProfileController"
        // })
        .state('storeprofile', {
            name: 'storeprofile',
            parent: '',
            data: {
              authorizedRoles: [USER_ROLES.admin]
            },
            url: "/storeprofile/:id",
            templateUrl: "angular/Modules/Profile/Store/newstoreprofile.html",
            controller: "StoreProfileController"
        })
        .state('userprofile', {
            name: 'userprofile',
            parent: '',
            data: {
                authorizedRoles: [USER_ROLES.admin]
            },
            url: "/userprofile",
            templateUrl: "angular/Modules/Profile/User/userprofile.html",
            controller: "UserProfileController"
        })
        .state('userprofile.shops', {
            name: 'userprofile.shops',
            parent: 'userprofile',
            data: {
                authorizedRoles: [USER_ROLES.admin]
            },
            url: "/shops",
            templateUrl: "angular/Modules/Profile/User/Shops/shops.html",
            controller: "ShopController"
        })
        .state('userprofile.personal', {
            name: 'userprofile.personal',
            parent: 'userprofile',
            data: {
                authorizedRoles: [USER_ROLES.admin]
            },
            url: "/personal",
            templateUrl: "angular/Modules/Profile/User/Personal/personal.html",
            controller: "UserProfileController"
        })

}]);

/* Factory */
var hudFactory = angular.module('HUD-Factory', []); //
hudFactory.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);
hudFactory.factory('DataFactory', ['$http', 'ConfigurableItems', function ($http, config) {
    "use strict";
    var str = "localhost:8080/carlo/";
    return {
        //Samples
        SampleGET: function () {
            return $http({
                url: "url/sampleget",
                method: 'GET'
            });
        },
        SignUp: function (user) { 
            return $http({
                url: "../index.php/home_controller/insertUser/",
                method: 'POST',
                data: user
            });
        },
        GetSavedStores: function (id) {
            return $http({
                url: "../index.php/user_controller/getSavedStores?userid="+id,
                method: 'GET'
            });
        },
        CreateShop: function (obj) { 
            return $http({
                url: "../index.php/shop_controller/insertShop/",
                method: 'POST',
                data: obj
            });
        },GetShops: function (id) {
            return $http({
                url: "../index.php/shop_controller/getShops?id="+id,
                method: 'GET'
            });
        },UploadProduct: function (obj) {
            return $http({
                url: "../index.php/shop_controller/upload",
                method: 'POST',
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                data: obj,
                uploadEventHandlers: {
                    progress: function(e) {
                        alert(e.loaded * 100 / e.total);
                    }
                }

            });
        },GetProducts: function(id){
            return $http({
                url: "../index.php/shop_controller/getProducts?id="+id,
                method: 'GET'
            });
        },GetShop: function(id){
            return $http({
                url: "../index.php/shop_controller/getShop?id="+id,
                method: 'GET'
            });
        },SignIn: function($username, $password){
            return $http({
                url: "../index.php/home_controller/login?username="+username+"&password="+password,
                method: 'GET'
            });
        },UpdateUser: function (obj) {
            return $http({
                url: "../index.php/user_controller/updateUser",
                method: 'POST',
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                data: obj

            });
        },Search: function(keyword){
            return $http({
                url: "../index.php/search_controller?keyword="+keyword,
                method: 'GET'
            });
        },CheckShopUsername: function(name){
            return $http({
                url: "../index.php/shop_controller/checkShopUsername?name="+name,
                method: 'GET'
            });
        },UpdateStore: function (obj) {
            return $http({
                url: "../index.php/shop_controller/updateShopInfo",
                method: 'POST',
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                data: obj

            });
        }
    }
    
}]);

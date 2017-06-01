app.controller('ShopController', function ($rootScope,$state, $scope, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav) {
    $scope.SVG = ConfigurableItems.SVG;

    var user = $rootScope.currentUser;

    if(user==null){
      $state.go('home');
    }
    $scope.user_id = user.userid;

    $scope.gotoShop = function(id){
      $state.go('storeprofile',{id:id});
    }
    $scope.shops = [];
    DataFactory.GetShops($scope.user_id).then(function(res){
      if(res.data != 'null'){
        $scope.shops= res.data;
      }
    });

  $scope.showDialog = showDialog;
    function showDialog($event) {
         var parentEl = angular.element(document.body);
         $mdDialog.show({
           parent: parentEl,
           targetEvent: $event,
           templateUrl:'angular/Modules/Profile/User/Shops/createShop.html',
           locals: {
             userid: $scope.user_id
           },
           controller: DialogController,
           clickOutsideToClose: true,
        escapeToClose: true
        });
    }

    function DialogController($scope, $mdDialog, userid) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.categories = ['Bags','Small Bags','Clothes','Retail','Toys','Shoes','Food','Service'];

        $scope.checkusername = function(){
          DataFactory.CheckShopUsername($scope.username)
          .then(function(res){
            if(res.data){
              $scope.taken = true;
              $scope.addForm.$valid = false;
            }else{
              $scope.taken = false;
              console.log('not taken');
            }
          });
        }
        $scope.submitForm = function() {
          // you can check is form valid with help of $valid parameter
            
          if($scope.addForm.$valid){
                var user = {
                  "name": $scope.name,
                  "category": $scope.category,
                  "user_id": userid,
                  "username": $scope.username,
                }
                DataFactory.CreateShop(user)
                .then(function (response) {
                   var res = response.data;
                   if(res!='null'){

                      $mdDialog.hide();
                      $state.go('storeprofile',{id:res.data});
                   }
                });             
          }else{ 
            angular.forEach($scope.addForm.$error.required, function(field) {
                field.$setTouched();
            });
          }
        }
      }

      
})
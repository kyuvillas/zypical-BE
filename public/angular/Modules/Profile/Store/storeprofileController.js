app.controller('StoreProfileController', function ($window,$http,$stateParams,$state, $scope, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav) {
    $scope.SVG = ConfigurableItems.SVG;

    $scope.ostat = 2;
    $scope.ChangeOstat = function (id) {
        $scope.ostat = id;
    }
    
    GetProducts();
    GetShop();

    $scope.products = [];
    function  GetProducts(){
      DataFactory.GetProducts($stateParams.id)
      .then(function(res){
        if(res.data !='null'){
          $scope.products = res.data;
          console.log($scope.products);  
        }
        
      });
    }
    function  GetShop(){
      DataFactory.GetShop($stateParams.id)
      .then(function(res){
        $scope.shop = res.data[0];
        $scope.delivery = JSON.parse(res.data[0].delivery);
        console.log( $scope.shop);

      });
    }
    $scope.showedit = function(){
      if($scope.edit) $scope.edit = false;
      else $scope.edit = true;

    }
    $scope.showDialog = showDialog;
    $scope.showEdit = showEditDialog;
    function showDialog($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         templateUrl:'angular/Modules/Profile/Store/upload-product.html',
         locals: {
         },
         controller: DialogController,
         clickOutsideToClose: true,
  		escapeToClose: true
      });
      function DialogController($scope, $mdDialog) {
        
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.upload = function(){

          $scope.category = ["Clothes","Shoes","Toys","Bags","Kitchenware","Outdoor","Sports","Plants","Appliances","","Food"]

           var fd = new FormData();
           fd.append('shop_id', $stateParams.id);
           fd.append('name', $scope.name);
           fd.append('desc', $scope.desc);
           fd.append('category', $scope.category);
           fd.append('price', $scope.price);

           // add pictures
           angular.forEach($scope.myFile, function(file,key) {                  
            fd.append(key, file);
          });          
          
          DataFactory.UploadProduct(fd)
          .success(function(d){

              if(d == 'successful'){
                GetProducts();
                $mdDialog.hide();
              }
              console.log(d);
            }).error(function(d){
              console.log(d);
            })
        }

        $scope.filesChanged = function(element){
          $scope.files = element.files;
          $scope.$apply();
        } 
        $scope.buttonupload = function () {
          angular.element(document.querySelector('#products')).click();
        };
      }
    }
    // showEditDialog();
    function showEditDialog($event){
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         templateUrl:'angular/Modules/Profile/Store/editshop.html',
         locals: {
          shop: $scope.shop
         },
         controller: editDialogController,
         clickOutsideToClose: true,
      escapeToClose: true
      });
      function editDialogController($scope, $mdDialog,$window,shop) {
         $scope.selected = JSON.parse(shop.delivery);
         $scope.fb  = shop.fb;
         $scope.insta  = shop.ig;
         $scope.delivery  = $scope.delivery = JSON.parse(shop.delivery);
         $scope.description  = shop.about;

         console.log($scope.selected);
         $scope.items= ["Shipment", "Meet up", "COD"];
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }

          $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
              list.splice(idx, 1);
            }
            else {
              list.push(item);
            }
          };

          $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
          };

          $scope.updateStore = function(){
            var fd = new FormData();
             fd.append('shop_id', $stateParams.id);
             fd.append('fb', $scope.fb);
             fd.append('insta', $scope.insta);
             fd.append('delivery', JSON.stringify($scope.selected));
             fd.append('description', $scope.description);     
             fd.append('displaypic', $scope.myFile);

             DataFactory.UpdateStore(fd)
            .success(function(d){
             // $window.location.reload();
             // $route.reload();
             $window.location.reload();
                $mdDialog.hide();
                console.log(d);
              }).error(function(d){
                console.log(d);
              })
          }
          
        $scope.upload = function(){

           var fd = new FormData();
           fd.append('shop_id', $stateParams.id);
           fd.append('name', $scope.name);
           fd.append('desc', $scope.desc);
           fd.append('category', $scope.category);
           fd.append('price', $scope.price);
           fd.append('delivery', $scope.delivery);  

           // add pictures
           angular.forEach($scope.myFile, function(file,key) {                  
            fd.append(key, file);
          });          
          
          DataFactory.UploadProduct(fd)
          .success(function(d){

              if(d == 'successful'){
                GetProducts();
                $mdDialog.hide();
              }
              console.log(d);
            }).error(function(d){
              console.log(d);
            })
        }

        $scope.filesChanged = function(element){
          $scope.files = element.files;
          $scope.$apply();
        } 
        $scope.buttonupload = function () {
          angular.element(document.querySelector('#products')).click();
        };
      }
    }
})
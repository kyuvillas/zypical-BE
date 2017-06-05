app.controller('StoreProfileController', function ($http,$stateParams,$state, $scope, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav) {
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
         templateUrl:'angular/Modules/Profile/upload-product.html',
         locals: {
           items: $scope.items
         },
         controller: DialogController,
         clickOutsideToClose: true,
  		escapeToClose: true
      });
      function DialogController($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.closeDialog = function() {
          $mdDialog.hide();
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
    showEditDialog();
    function showEditDialog($event){
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         templateUrl:'angular/Modules/Profile/Store/editshop.html',
         locals: {
         },
         controller: editDialogController,
         clickOutsideToClose: true,
      escapeToClose: true
      });
      function editDialogController($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.items = [1,2,3,4,5];
        $scope.selected = [1];
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

        $scope.isIndeterminate = function() {
          return ($scope.selected.length !== 0 &&
              $scope.selected.length !== $scope.items.length);
        };

        $scope.isChecked = function() {
          return $scope.selected.length === $scope.items.length;
        };

        $scope.toggleAll = function() {
          if ($scope.selected.length === $scope.items.length) {
            $scope.selected = [];
          } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.items.slice(0);
          }
        };
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
app.controller('SearchController', function ($stateParams,$state, $scope, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav) {
    console.log($stateParams);
    search($stateParams.keyword);

    $scope.results = [];
    function search(keyword){
        DataFactory.Search(keyword).then(function(res){
            if(res.data != 'null'){
                $scope.results=res.data;  
                console.log(res.data);
            }
        })
    }
    $scope.showPrerenderedDialog = function(ev) {
    $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
    function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  };

})
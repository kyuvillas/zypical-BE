app.controller('UserProfileController', function ($rootScope,$state, $scope, $interval, $mdDialog, ConfigurableItems, DataFactory, $mdSidenav) {
    $scope.SVG = ConfigurableItems.SVG;

    // saved stores - sa right side
    // messages
    // orders placed
    // list of business - sa right side
    // my profile
    // affiliate - wag muna
    
    var user = $rootScope.currentUser;
    
    if(user==null){
      $state.go('home');
    }
    $scope.Name = user.fname + ' ' + user.lname;
    $scope.user = user;
    
    $scope.buttonupload = function () {
      $state.go('userprofile.personal');
    };
    
    $scope.fname=user.fname;
    $scope.lname=user.lname;
    $scope.username=user.username;
    $scope.emailaddress=user.emailaddress;

    $scope.save = function() {
        console.log($scope.myFile);
        var fd = new FormData();
           fd.append('id', user.userid);
           fd.append('fname', $scope.fname);
           fd.append('lname', $scope.lname);
           fd.append('username', $scope.username);
           fd.append('emailaddress', $scope.emailaddress);
           fd.append('picture', $scope.myFile[0]);

        DataFactory.UpdateUser(fd)
        .then(function (response) {
            console.log(response.data);
            if(response.data=='error'){
                alert('error');
            }else{
                $state.go('userprofile');

            }
        });         
      }
})
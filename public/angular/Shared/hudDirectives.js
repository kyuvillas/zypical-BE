/* DIRECTIVES */
var hudDirectives = angular.module('HUD-Directives', ['HUD-Factory']); //
hudDirectives.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});
hudDirectives.directive("hudMainStyles", function () {
    return {
        restrict: 'E',
        templateUrl: "angular/CSSTemplates/hudMainStyles.html"
    }
});

hudDirectives.directive("hudSetter", function () {
    return {
        restrict: 'A',
        scope: {
            heightInPercent: '=',
            widthInPercent: '=',
            minheightInPercent: '=',
            minwidthInPercent: '=',
            fontInPercent: '=',
            margin: '=',
            padding: '=',
            inBlock: '='
        },
        replace: true,
        link: function (scope, element, attrs) {
            if (scope.heightInPercent !== undefined) {
                $(element[0]).css("height", scope.heightInPercent.toString() + "%");
            }
            if (scope.widthInPercent !== undefined) {
                $(element[0]).css("width", scope.widthInPercent.toString() + "%");
            }
            if (scope.minheightInPercent !== undefined) {
                $(element[0]).css("min-height", scope.minheightInPercent.toString() + "%");
            }
            if (scope.minwidthInPercent !== undefined) {
                $(element[0]).css("min-width", scope.minwidthInPercent.toString() + "%");
            }
            if (scope.fontInPercent !== undefined) {
                $(element[0]).css("font-size", scope.fontInPercent.toString() + "%");
            }
            if (scope.margin !== undefined) {
                $(element[0]).css("margin", scope.margin);
            }
            if (scope.padding !== undefined) {
                $(element[0]).css("padding", scope.padding);
            }
            if (scope.inBlock !== undefined) {
                $(element[0]).css("display", 'inline-block');
            }
        }
    }

});

/* Highcharts */
hudDirectives.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        var pic = element[0].files[0];
                        modelSetter(scope, element[0].files[0]);
                        console.log(element[0].files[0]);
                        if(pic.size > 350000){
                          scope.max = true;
                          scope.updateform.$valid = false;
                        }
                        else if(!pic.type.includes("image")){
                          scope.type = true;
                          scope.updateform.$valid = false;                          
                        }
                        else{
                          scope.max = false;
                          scope.updateform.$valid = true;
                        }
                     });

                  });                     
               }
            };
         }]);
hudDirectives.directive('fileModelMuptiple', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files);
                     });

                  });                     
               }
            };
         }]);
hudDirectives.directive('resultDiv', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
         var count =1;
         $(".result-item").hide();
          $(".result-item").each(function()
          {   
              var grid = $(this);
              setTimeout(function(){
                grid.addClass('animated pulse');
                grid.show();
              },200 + ( count* 200 ));
              count ++;
          });
          $('#add').show();
    }
  };
})
var app = angular.module("myapp", []);
app.controller("OurController", OurController, ['OurResource']);

function OurController($scope, $http) {
    var vm = this;

    vm.test= "asd";

    vm.casType = [
        {"id":1 , "type":1}
    ]

    vm.items= [
        {id:1 , "name":"Апельсин" , "price":"37.2" } ,
        ];

    vm.log = function() {
        console.log(vm);
    }

    vm.edit = function(item) {
        console.log(item);
        vm.data = angular.copy(item);;
        $('#obligationModal').modal();
    }

    vm.add = function() {
        vm.index = null;
        vm.data = angular.copy({});;
        $('#obligationModal').modal();
    }

    vm.save = function() {
        // Запись в массив
        if (vm.index === null)
            vm.items.push(vm.data);
        else
            vm.items[vm.currentSubjectIndex] = vm.data;
        $('#obligationModal').modal('hide');
    }

}


app.filter('test', function() {
    return function (input) {
        let item = input;
        debugger
        return 777;
    }
});

app.directive('convertToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            // From the DOM
            ngModel.$parsers.push(function(val) {
                return val != null ? parseInt(val, 10) : null;
            });

            // To the DOM
            ngModel.$formatters.push(function(val, oldVal) {
                return val != null ? '' + val : oldVal;
            });
        }
    };
});
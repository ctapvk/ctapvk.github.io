var app = angular.module("myapp", []);
app.controller("OurController", OurController, ['OurResource']);

function OurController($scope, $http) {
    var vm = this;

    vm.currentItem = {};
    vm.currentItem.date_get_accrual = "2017-03-03";
    vm.currentItem.our_emails = [{ id: 1, email: "ads" }, { id: 1, email: "ads" }];

    vm.log = function() {
        console.log(vm);
    }
    vm.gg = function() {
        $http({
            method: 'POST',
            url: '/test/angular/dat.js',
            data: JSON.stringify({ id: 1 }),
            headers: { 'Content-Type': undefined }
        }).then(function(data) {
            console.log("sucess");
            console.log((data.data));
            vm.currentItem.our_emails = data.data;
        }, function() { console.log('error'); });
    }
}


app.directive('dateRangePicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            debugger
            $(function(){
                element.daterangepicker({
                    singleDatePicker: true,
                    minDate: "01.01.1900",
                    autoUpdateInput: false,
                    locale: {
                        format: 'DD.MM.YYYY'
                    }
                });
                $(element).on('apply.daterangepicker', function(ev, picker) {
                    ngModel.$setViewValue(picker.startDate.format('DD.MM.YYYY'));
                    ngModel.$render();
                });

                ngModel.$parsers.push(function(val) {
                    return !val ? null : moment(val, 'DD.MM.YYYY').format('YYYY-MM-DD');
                });

                ngModel.$formatters.push(function(val) {
                    if(val && moment(val, 'YYYY-MM-DD').isValid()) {
                        val = moment(val, 'YYYY-MM-DD');

                        $(element).data('daterangepicker').setStartDate(val);
                        $(element).data('daterangepicker').setEndDate(val);

                        return val.format('DD.MM.YYYY');
                    } else {
                        return '';
                    }
                });
            });
        }
    };
});




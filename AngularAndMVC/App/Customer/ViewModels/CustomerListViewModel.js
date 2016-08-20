customerModule.controller("customerListViewModel", function ($scope, customerService, $http, $q, $routeParams, $window, $location, viewModelHelper, $uibModal) {

    $scope.viewModelHelper = viewModelHelper;
    $scope.customerService = customerService;

    var initialize = function () {
        $scope.refreshCustomers();
    }

    $scope.refreshCustomers = function () {
        viewModelHelper.apiGet('api/customers', null,
            function (result) {
                $scope.customers = result.data;
            });
    }

    $scope.showCustomer = function (customer) {
        $scope.flags.shownFromList = true; // note this object is declared in the RootViewModel
        //viewModelHelper.navigateTo('customer/show/' + customer.CustomerId);
        console.log(customer.CustomerId);
        $uibModal.open({
            templateUrl: '/App/Customer/Views/CustomerView.html',
            controller: 'customerViewModel',
            scope: $scope
        });
    }

   
    initialize();
});


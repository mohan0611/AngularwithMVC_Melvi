customerModule.controller("customerListViewModel", function ($scope, customerService, $http, $q, $routeParams, $window, $location, viewModelHelper, $uibModal, $log) {

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

    $scope.saveCustomer = function () {
        console.log($scope.customers);
        
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



    //Modal test

    
    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        //console.log(size);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                item: function () {
                    return size;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //$scope.toggleAnimation = function () {
    //    $scope.animationsEnabled = !$scope.animationsEnabled;
    //};
});


customerModule.controller('ModalInstanceCtrl', function ($scope, viewModelHelper, $uibModalInstance, item) {

    $scope.item = item;


    $scope.ok = function () {
        $uibModalInstance.close($scope.item);
        console.log($scope.item);
        viewModelHelper.apiPost('api/customers', $scope.item,
            function (result) {
                $scope.item = result.data;
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});
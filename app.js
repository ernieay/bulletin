var codenameApp = angular.module('bulletinApp', []);

codenameApp.controller('BulletinController', function GameController($scope, $http, $interval) {

    $scope.announcements = [
        {
            "info": "4pm Gordon Library Meeting Room",
            "details": "Remember each Sunday at 4pm to come together to pray for the work of the gospel here and abroad.",
            "id": "1",
            "title": "Time to pray together"
        }
    ];

    $scope.refresh = function () {
        $http({
            method: 'GET',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/GETannouncements'
        }).then(function successCallback(response) {
            $scope.announcements = response.data.body;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.refresh();

});
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
    $scope.new = {};

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

    $scope.add = function () {
        $scope.new.id = Date.now().toString();
        $http({
            method: 'POST',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/GETannouncements',
            data: $scope.new
        }).then(function successCallback(response) {
            $scope.announcements.push($scope.new);
            $scope.new = {};
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.delete = function (id) {
        
        $http({
            method: 'DELETE',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/GETannouncements?id=' + id
        }).then(function successCallback(response) {
            $scope.announcements = $scope.announcements.filter(announcement => announcement.id !== id);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.refresh();

});
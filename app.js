var codenameApp = angular.module('bulletinApp', ['chart.js']);

codenameApp.controller('BulletinController', function GameController($scope, $http, $interval) {

    $scope.announcements = [
        {
            "info": "4pm Gordon Library Meeting Room",
            "details": "Remember each Sunday at 4pm to come together to pray for the work of the gospel here and abroad.",
            "id": "1",
            "title": "Time to pray together"
        }
    ];
    $scope.schedule = {};
    $scope.date = "";
    $scope.stats = {};
    $scope.new = {};
    $scope.labels = [
        'General Fund',
        'Mission Fund'
    ]
    $scope.series = ['Target to date', 'Actual to date'];
    $scope.data = [[0,0], [0,0]];
    $scope.question = {text : ""};
    $scope.sent = false;
    $scope.mcQuestions = [];

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

        $http({
            method: 'GET',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/questions'
        }).then(function successCallback(response) {
            $scope.mcQuestions = response.data.body;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $http({
            method: 'GET',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/schedule'
        }).then(function successCallback(response) {
            $scope.schedule = response.data.body;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $http({
            method: 'GET',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/statistics'
        }).then(function successCallback(response) {
            $scope.stats = response.data.body;
            $scope.data[0][0] = $scope.stats.gftarget;
            $scope.data[0][1] = $scope.stats.mftarget;
            $scope.data[1][0] = $scope.stats.gfactual;
            $scope.data[1][1] = $scope.stats.mfactual;
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

    $scope.updateSchedule = function () {
        $scope.schedule.id = "1";
        $http({
            method: 'PUT',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/schedule',
            data: $scope.schedule
        }).then(function successCallback(response) {

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.updateStats = function () {
        $scope.stats.id = "1";
        $http({
            method: 'PUT',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/statistics',
            data: $scope.stats
        }).then(function successCallback(response) {
            
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

    $scope.sendQuestion = function () {
       
        $http({
            method: 'POST',
            url: 'https://hx0wfex80e.execute-api.ap-southeast-2.amazonaws.com/prod/questions',
            data: $scope.question
        }).then(function successCallback(response) {
            $scope.sent = true;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.setDate = function () {
        var day = new Date();
        while (day.getDay() != 7) day = new Date(day.valueOf()-86400000);

        $scope.date = `Sunday ${day.getDate()} ${day.getMonth()}`;
    }
    
    $scope.setDate();
    $scope.refresh();

});
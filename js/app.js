var app=angular.module('demoApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login');
    $stateProvider.state("login", {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: "loginController"
      }).state("registration", {
        url: "/registration",
        templateUrl: "partials/registration.html",
        controller: "registrationController"
      }).state("chat", {
        url: "/chat",
        templateUrl: 'partials/chat.html',
        controller: "chatController"
      });
});
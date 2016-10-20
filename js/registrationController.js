app.controller( "registrationController", function($rootScope,$scope, $state) {
$scope.clickToRegister=function(){
$rootScope.userInformation.name=$scope.name;
$rootScope.userInformation.mobile=$scope.mobile;
$rootScope.userInformation.password=$scope.newPassword;
$rootScope.isMove('login');
}
});

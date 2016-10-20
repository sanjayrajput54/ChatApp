app.controller( "loginController", function($rootScope,$scope, $state) {

$scope.clickToLogin=function(){
if($rootScope.userInformation.mobile==$scope.userMobile && $rootScope.userInformation.password==$scope.userPassword){
$rootScope.isMove('chat');
}};
});

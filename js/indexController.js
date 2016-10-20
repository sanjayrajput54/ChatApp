app.controller( "indexController", function($rootScope, $state) {
    //console.log("indexController loaded.");
	 $rootScope.passwordMatch="Plz enter correct new password and confirm password";
	 $rootScope.isMove=function(stateName){
     $state.go(stateName);
     }
	 $rootScope.clickToCancel=function(){
     $state.go('login');
     }
	 $rootScope.userInformation={
	 name:'',
	 mobile:'',
	 password:''
	 
	 }
	 
});


	angular.module('ionicApp.controllers',[]).filter('rssDate', function() 
	{
 		return function(value) {
			return new Date(value).toLocaleString();
		};
	});
	
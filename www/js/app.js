angular.module('ionicApp', ['ionic','ionicApp.controllers','ionicApp.services'])

.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider) {
  

$stateProvider
    
    
    .state('home', {
      url: "/home",
       views: {
            'menuContent': {
          
         
      templateUrl: "templates/home.html",
      controller: 'HomeTabCtrl'
    }
  }
      
    })
    .state('home.detail', {
      url: "/detail",
      views: {
        'menuContent': {
       templateUrl: "templates/detail.html",
        controller: 'DetailTabCtrl'
       }
      },
      params: {
        obj: null
         }
       
    })
    .state('detail.htmlBlog', {
      url: "/htmlBlog",
      views: {
        'menuContent': {
      
       templateUrl: "templates/HTML_Blogs.html",
       controller: 'DashboardCtrl as vm'
     }
   }
      
    })
    .state('detail.blogDetail', {
      url: "/blogDetail",
      
       templateUrl: "templates/blog_detail.html",
       controller: 'blogDetailCtrl' ,
       params: {
        blogItem: null
         } 
      
      
    })
    
        .state('detail.rssfeeds', {
          url: '/rssfeeds',
          views: {
            'menuContent': {
              templateUrl: 'templates/rss-feeds.html',
              controller: 'RSSFeedsController as vm'
            }
          }
        })
        .state('detail.rssfeed', {
          url: '/rssfeeds/:rssFeedId',
          views: {
            'menuContent': {
              templateUrl: 'templates/rss-feed.html',
              controller: 'RSSFeedController as vm'
            }
          }
        })
        .state('detail.rssarticle', {
          url: '/rssfeeds/:rssFeedId/:articleHash',
          views: {
            'menuContent': {
              templateUrl: 'templates/rss-article.html',
              controller: 'RSSArticleController as vm'
            }
          }
        })

    .state('detail.htmlQuiz', {
      url: "/htmlQuiz",
      
       templateUrl: "templates/quiz.html",
       controller: 'QuizCtrl'  
      
      
    })
    
    .state('htmlQuiz.create', {
      url: "/:create",
      
       templateUrl: "templates/create.html",
       controller: 'DashboardCtrl as vm'  
      
      
    })

   $urlRouterProvider.otherwise("/home");

});


 angular.module('ionicApp.controllers', [])

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
  
  
    $scope.images = [];
    $scope.names = ["HTML5","CSS","JavaScript","AngularJs"]; 
    $scope.loadImages = function() {
        for(var i = 0; i < 4; i++) {
            $scope.images.push({id: i, src: "img/angular.png",name:$scope.names[i]});
        }
    }
    $scope.loadImages();
    console.log($scope.images);
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
  
})

.controller('HomeTabCtrl', function($scope,$state) {
  
  alert("jhjj")
    $scope.images = [];
    $scope.names = [{name:"HTML5",image:"img/HTML5.png"},{name:"CSS",image:"img/css3.png"},{name:"JavaScript",image:"img/js.png"},
    {name:"AngularJs",image:"img/angular.png"},{name:"HTML5",image:"img/HTML5.png"},{name:"CSS",image:"img/css3.png"},
    {name:"JavaScript",image:"img/js.png"},{name:"AngularJs",image:"img/angular.png"}]; 

    $scope.loadImages = function() {
        for(var i = 0; i < 8; i++) {
            $scope.images.push({id: i, src: $scope.names[i].image,name:$scope.names[i].name});
        }
    }
    $scope.loadImages();

    $scope.onClick = function(name)
    {
      $state.go("home.detail",{obj: name});
    }
    
})

.controller('DetailTabCtrl', function($scope,$state,$stateParams,getFeeds) {

   var selectedItem = $stateParams.obj; 
   $scope.selectedPage = selectedItem;
  $scope.items = getFeeds.getValue($scope.selectedPage);
 

  $scope.itemClick = function(itemName)
  {
    
    
    switch(itemName)
    {
      case "HTML5 Blogs":
        $state.go("detail.htmlBlog");
      break;

      case "HTML5 Quiz":  
        $state.go("htmlQuiz");
      break;

      case "RSS Feed":  
      alert("hhhhhhhhhhhh")
        $state.go("detail.rssfeeds");
      break;


    }
  }

  
  })

.controller('DashboardCtrl', function (bloglistService,$scope,$state)
{
    bloglistService.getBlogs().then(function (result) 
   {
        
         $scope.items = result.data
                    
   });

           

  $scope.blogItemClick = function(item)
  {
      
      $state.go("blogDetail",{blogItem: item});
  }

     
})
.controller('blogDetailCtrl', function ($rootScope,$scope,$stateParams)
{

  if($stateParams.blogItem != null)
  {
    $scope.selectedBlog = $stateParams.blogItem; 
    $rootScope.tempValue = $scope.selectedBlog;
  }
  else
  {
    $scope.selectedBlog = $rootScope.tempValue;
    
  }
  var iabRef = null;
   
   var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };

  $scope.openBlog =  function(url)
  {   
    
    
    iabRef = window.open(url,'_blank',options);  
     iabRef.addEventListener('loadstart', iabLoadStart);
         iabRef.addEventListener('loadstop', iabLoadStop);
         iabRef.removeEventListener('loaderror', iabLoadError);
         iabRef.addEventListener('exit', iabClose);
         
  }

  function iabLoadStart(event) {
        alert(event.type + ' - ' + event.url);
    }

    function iabLoadStop(event) {
        alert(event.type + ' - ' + event.url);
    }

    function iabLoadError(event) {
        alert(event.type + ' - ' + event.message);
    }

    function iabClose(event) {
         alert(event.type);
         iabRef.removeEventListener('loadstart', iabLoadStart);
         iabRef.removeEventListener('loadstop', iabLoadStop);
         iabRef.removeEventListener('loaderror', iabLoadError);
         iabRef.removeEventListener('exit', iabClose);
    }
})
 .controller('RSSFeedsController', function ($scope, $state, rssFeedsService)
{


    var vm = angular.extend(this, {
      rssFeeds: []
    });

    // ********************************************************************

    rssFeedsService.getFeedList()
      .then(function(data) {
        vm.rssFeeds = data;
      });
  
})

.controller('RSSFeedController', function ($stateParams, rssFeedsService)
{


   var vm = angular.extend(this, {
      entries: null,
      rssFeedId: parseInt($stateParams.rssFeedId, 10)
    });

    // ********************************************************************

    function loadFeed() {
      rssFeedsService.getFeed(vm.rssFeedId)
        .then(function(entries) {
          vm.entries = entries;
        });
    }
    loadFeed();
  }
  
)

.controller('RSSArticleController', function ($stateParams, $ionicActionSheet, rssFeedsService)
{
    var articleHash = $stateParams.articleHash;
    var feedId = parseInt($stateParams.rssFeedId, 10);

    var vm = angular.extend(this, {
      article: null,
      showActions: showActions,
      showInBrowser: showInBrowser
    });

    // ********************************************************************

    function getArticle(articleHash) {
      rssFeedsService.getArticle(feedId, articleHash)
        .then(function(article) {
          vm.article = article;
        });
    }
    getArticle(articleHash);

    function showActions() {
      $ionicActionSheet.show({
        buttons: [
          { text: 'Open in browser' },
          { text: 'Share' }
        ],
        titleText: 'Actions',
        cancelText: 'Cancel',
          buttonClicked: function(index) {
            switch(index) {
              case 0:
                showInBrowser(vm.article.link);
                break;
            }
            return true;
        }
      });
    }

    function showInBrowser(link) {
      window.open(link, '_system');
    }
  }
)

/*.controller('DashboardCtrl', function (ItemsModel, $rootScope,$stateParams,$scope,$rootScope) {
        var vm = this;

        $scope.title = $stateParams.name;
        $rootScope.pageName = $stateParams.name;
        
        function goToBackand() {
            window.location = 'http://docs.backand.com';
        }

        function getAll() {

            ItemsModel.all()
                .then(function (result) {
                    vm.data = result.data
                    console.log(vm.data)
                });
        }

        function clearData(){
            vm.data = null;
        }

        function create(object) {
            ItemsModel.create(object)
                .then(function (result) {
                    cancelCreate();
                    getAll();
                });
        }

        function update(object) {
            ItemsModel.update(object.id, object)
                .then(function (result) {
                    cancelEditing();
                    getAll();
                });
        }

        function deleteObject(id) {
            ItemsModel.delete(id)
                .then(function (result) {
                    cancelEditing();
                    getAll();
                });
        }

        function initCreateForm() {
            vm.newObject = {name: '', description: ''};
        }

        function setEdited(object) {
            vm.edited = angular.copy(object);
            vm.isEditing = true;
        }

        function isCurrent(id) {
            return vm.edited !== null && vm.edited.id === id;
        }

        function cancelEditing() {
            vm.edited = null;
            vm.isEditing = false;
        }

        function cancelCreate() {
            initCreateForm();
            vm.isCreating = false;
        }

        vm.objects = [];
        vm.edited = null;
        vm.isEditing = false;
        vm.isCreating = false;
        vm.getAll = getAll;
        vm.create = create;
        vm.update = update;
        vm.delete = deleteObject;
        vm.setEdited = setEdited;
        vm.isCurrent = isCurrent;
        vm.cancelEditing = cancelEditing;
        vm.cancelCreate = cancelCreate;
        vm.goToBackand = goToBackand;
        vm.isAuthorized = false;

        

        initCreateForm();
        getAll();

    })*/

 //quiz stuff

.controller('createCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.quizName = 'js/emptyQuiz.js';
    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    }

    $scope.onSelect = function (option) {
        $scope.questions[$scope.currentPage - 1].selected = option;
        $scope.questions[$scope.currentPage - 1].answered = option.Id;
    }

    $scope.onSave = function () {
        var ques = JSON.stringify($scope.questions, undefined, 2);
        console.log(ques);
        //$scope.mode = 'result';
    }
    $scope.itemsPerPage = 1;

    $scope.pageCount = function () {
        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    };

    //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
    $scope.loadQuiz = function (file) {
        $http.get(file)
         .then(function (res) {
             $scope.quiz = res.data.quiz;
             $scope.questions = res.data.questions;
             $scope.totalItems = $scope.questions.length;
             $scope.currentPage = 1;
             $scope.mode = 'quiz';

             $scope.$watch('currentPage + itemsPerPage', function () {
                 var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                   end = begin + $scope.itemsPerPage;

                 $scope.filteredQuestions = $scope.questions.slice(begin, end);
             });
         });
    }
    $scope.loadQuiz($scope.quizName);

    $scope.isAnswered = function (index) {
        var answered = 'Not Answered';
        $scope.questions[index].options.forEach(function (element, index, array) {
            if (element.selected == true) {
                answered = 'Answered';
                return false;
            }
        });
        return answered;
    };

    $scope.isCorrect = function (question) {
        var result = 'correct';
        var options = question.options || [];
        options.forEach(function (option, index, array) {
            if ($scope.toBool(option.selected) != option.isAnswer) {
                result = 'wrong';
                return false;
            }
        });
        return result;
    };

    //If you wish, you may create a separate utility or helper service to implement toBool. To keep things simple, i have kept it within controller.
    $scope.toBool = function (val) {
        if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
            return false;
        else if (val == true || val == 'true' || val == 'True')
            return true;
        else
            return 'Not Identified';
    };
  }])


.controller('QuizCtrl',  function ($scope, $http,helperService) 
{
    $scope.quizName = 'data/csharp.js';

    //Note: Only those configs are functional which is documented at: http://www.codeproject.com/Articles/860024/Quiz-Application-in-AngularJs
    // Others are work in progress.
    $scope.defaultConfig = 
    {
        'allowBack': true,
        'allowReview': true,
        'autoMove': false,  // if true, it will move to next question automatically when answered.
        'duration': 0,  // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
        'pageSize': 1,
        'requiredAll': false,  // indicates if you must answer all the questions before submitting.
        'richText': false,
        'shuffleQuestions': false,
        'shuffleOptions': false,
        'showClock': false,
        'showPager': true,
        'theme': 'none'
    }

    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    }

    $scope.onSelect = function (question, option) {
        if (question.QuestionTypeId == 1) {
            question.Options.forEach(function (element, index, array) {
                if (element.Id != option.Id) {
                    element.Selected = false;
                    //question.Answered = element.Id;
                }
            });
        }

        if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
            $scope.currentPage++;
    }

    $scope.onSubmit = function () {
        var answers = [];
        $scope.questions.forEach(function (q, index) {
            answers.push({ 'QuizId': $scope.quiz.Id, 'QuestionId': q.Id, 'Answered': q.Answered });
        });
        // Post your data to the server here. answers contains the questionId and the users' answer.
        //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
        //    alert(data);
        //});
        console.log($scope.questions);
        $scope.mode = 'result';
    }

    $scope.pageCount = function () {
        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    };

    //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
    $scope.loadQuiz = function (file) {
        $http.get(file)
         .then(function (res) {
             $scope.quiz = res.data.quiz;
             $scope.config = helperService.extend({}, $scope.defaultConfig, res.data.config);
             $scope.questions = $scope.config.shuffleQuestions ? helperService.shuffle(res.data.questions) : res.data.questions;
             $scope.totalItems = $scope.questions.length;
             $scope.itemsPerPage = $scope.config.pageSize;
             $scope.currentPage = 1;
             $scope.mode = 'quiz';

             $scope.$watch('currentPage + itemsPerPage', function () {
                 var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                   end = begin + $scope.itemsPerPage;

                 $scope.filteredQuestions = $scope.questions.slice(begin, end);
             });
         });
    }
    $scope.loadQuiz($scope.quizName);

    $scope.isAnswered = function (index) {
        var answered = 'Not Answered';
        $scope.questions[index].Options.forEach(function (element, index, array) {
            if (element.Selected == true) {
                answered = 'Answered';
                return false;
            }
        });
        return answered;
    };

    $scope.isCorrect = function (question) {
        var result = 'correct';
        question.Options.forEach(function (option, index, array) {
            if (helperService.toBool(option.Selected) != option.IsAnswer) {
                result = 'wrong';
                return false;
            }
        });
        return result;
    };
});





